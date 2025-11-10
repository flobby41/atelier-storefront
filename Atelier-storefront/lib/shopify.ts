/**
 * Shopify Storefront API Client
 * Handles GraphQL requests to Shopify Storefront API
 */

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-10'
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

const endpoint = `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`

export interface ShopifyError {
  message: string
  locations?: Array<{ line: number; column: number }>
  path?: string[]
}

export interface ShopifyResponse<T> {
  data?: T
  errors?: ShopifyError[]
  extensions?: {
    cost?: {
      requestedQueryCost: number
      actualQueryCost?: number
      throttleStatus?: {
        maximumAvailable: number
        currentlyAvailable: number
        restoreRate: number
      }
    }
  }
}

/**
 * Execute a GraphQL query against Shopify Storefront API
 */
export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  revalidate,
}: {
  query: string
  variables?: Record<string, any>
  cache?: RequestCache
  revalidate?: number
}): Promise<ShopifyResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: revalidate ? { revalidate } : undefined,
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    const json: ShopifyResponse<T> = await response.json()

    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors)
      throw new Error(`Shopify GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`)
    }

    return json
  } catch (error) {
    console.error('Error fetching from Shopify:', error)
    throw error
  }
}

/**
 * Client-side fetch for Cart API operations
 * (Must be called from client components)
 */
export async function shopifyFetchClient<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, any>
}): Promise<ShopifyResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    const json: ShopifyResponse<T> = await response.json()

    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors)
      throw new Error(`Shopify GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`)
    }

    return json
  } catch (error) {
    console.error('Error fetching from Shopify:', error)
    throw error
  }
}


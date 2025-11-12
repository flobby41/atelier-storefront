/**
 * Shopify Admin API Client
 * Handles GraphQL requests to Shopify Admin API
 */

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2025-10'

// Check if Shopify Admin is configured
export const isShopifyAdminConfigured = !!(SHOP_DOMAIN && ADMIN_TOKEN)

const endpoint = SHOP_DOMAIN && ADMIN_TOKEN 
  ? `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/graphql.json`
  : null

const restEndpoint = SHOP_DOMAIN && ADMIN_TOKEN
  ? `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}`
  : null

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
 * Execute a GraphQL query against Shopify Admin API
 */
export async function shopifyAdminFetch<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, any>
}): Promise<ShopifyResponse<T>> {
  if (!isShopifyAdminConfigured || !endpoint) {
    throw new Error('Shopify Admin API is not configured. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_API_TOKEN environment variables.')
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Shopify Admin API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const json: ShopifyResponse<T> = await response.json()

    if (json.errors) {
      console.error('Shopify Admin GraphQL errors:', json.errors)
      throw new Error(`Shopify Admin GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`)
    }

    return json
  } catch (error) {
    console.error('Error fetching from Shopify Admin API:', error)
    throw error
  }
}

/**
 * Execute a REST API request against Shopify Admin API
 */
export async function shopifyAdminRestFetch<T>({
  method = 'GET',
  path,
  body,
}: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  body?: any
}): Promise<T> {
  if (!isShopifyAdminConfigured || !restEndpoint) {
    throw new Error('Shopify Admin API is not configured.')
  }

  try {
    const url = `${restEndpoint}${path}`
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Shopify Admin REST API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching from Shopify Admin REST API:', error)
    throw error
  }
}


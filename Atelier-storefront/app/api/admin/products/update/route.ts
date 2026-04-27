import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import {
  UPDATE_PRODUCT_VARIANT_PRICE_MUTATION,
  UPDATE_PRODUCT_VARIANT_INVENTORY_MUTATION,
  CREATE_PRODUCT_MUTATION,
} from '@/lib/admin-queries'

type ShopifyUserError = { message: string }

type UpdatePriceResponse = {
  productVariantUpdate?: {
    userErrors?: ShopifyUserError[]
  }
}

type UpdateInventoryResponse = {
  inventorySetOnHandQuantities?: {
    userErrors?: ShopifyUserError[]
  }
}

type CreateProductResponse = {
  productCreate?: {
    userErrors?: ShopifyUserError[]
  }
}

type UpdateProductAction = 'updatePrice' | 'updateInventory' | 'createProduct'

type UpdateProductRequestBody =
  | {
      action: 'updatePrice'
      variantId: string
      price: string
    }
  | {
      action: 'updateInventory'
      inventoryItemId: string
      locationId: string
      quantity: number
    }
  | {
      action: 'createProduct'
      title: string
      description: string
      vendor?: string
      productType?: string
      variants?: Array<{ price: string }>
      price?: string
      images?: unknown[]
    }

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = (await request.json()) as UpdateProductRequestBody

    if (body.action === 'updatePrice') {
      // Update variant price
      const response = await shopifyAdminFetch<UpdatePriceResponse>({
        query: UPDATE_PRODUCT_VARIANT_PRICE_MUTATION,
        variables: {
          input: {
            id: body.variantId,
            price: body.price,
          },
        },
      })

      const userErrors = response.data?.productVariantUpdate?.userErrors
      if (userErrors && userErrors.length > 0) {
        return NextResponse.json(
          { error: userErrors[0].message },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true, data: response.data })
    }

    if (body.action === 'updateInventory') {
      // Update inventory
      const response = await shopifyAdminFetch<UpdateInventoryResponse>({
        query: UPDATE_PRODUCT_VARIANT_INVENTORY_MUTATION,
        variables: {
          input: {
            reason: 'correction',
            setQuantities: [
              {
                inventoryItemId: body.inventoryItemId,
                locationId: body.locationId,
                quantity: body.quantity,
              },
            ],
          },
        },
      })

      const userErrors = response.data?.inventorySetOnHandQuantities?.userErrors
      if (userErrors && userErrors.length > 0) {
        return NextResponse.json(
          { error: userErrors[0].message },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true })
    }

    if (body.action === 'createProduct') {
      // Create a new product
      const response = await shopifyAdminFetch<CreateProductResponse>({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            title: body.title,
            description: body.description,
            vendor: body.vendor || '',
            productType: body.productType || '',
            variants: body.variants || [
              {
                price: body.price || '0.00',
              },
            ],
            images: body.images || [],
          },
        },
      })

      const userErrors = response.data?.productCreate?.userErrors
      if (userErrors && userErrors.length > 0) {
        return NextResponse.json(
          { error: userErrors[0].message },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true, data: response.data })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const message =
      error instanceof Error && error.message ? error.message : 'Error updating product'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import {
  UPDATE_PRODUCT_VARIANT_PRICE_MUTATION,
  UPDATE_PRODUCT_VARIANT_INVENTORY_MUTATION,
  CREATE_PRODUCT_MUTATION,
} from '@/lib/admin-queries'

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const { action, ...data } = body

    if (action === 'updatePrice') {
      // Update variant price
      const response = await shopifyAdminFetch({
        query: UPDATE_PRODUCT_VARIANT_PRICE_MUTATION,
        variables: {
          input: {
            id: data.variantId,
            price: data.price,
          },
        },
      })

      if (response.data?.productVariantUpdate?.userErrors?.length > 0) {
        return NextResponse.json(
          { error: response.data.productVariantUpdate.userErrors[0].message },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true, data: response.data })
    }

    if (action === 'updateInventory') {
      // Update inventory
      const response = await shopifyAdminFetch({
        query: UPDATE_PRODUCT_VARIANT_INVENTORY_MUTATION,
        variables: {
          input: {
            reason: 'correction',
            setQuantities: [
              {
                inventoryItemId: data.inventoryItemId,
                locationId: data.locationId,
                quantity: data.quantity,
              },
            ],
          },
        },
      })

      if (response.data?.inventorySetOnHandQuantities?.userErrors?.length > 0) {
        return NextResponse.json(
          { error: response.data.inventorySetOnHandQuantities.userErrors[0].message },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'createProduct') {
      // Create a new product
      const response = await shopifyAdminFetch({
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            title: data.title,
            description: data.description,
            vendor: data.vendor || '',
            productType: data.productType || '',
            variants: data.variants || [
              {
                price: data.price || '0.00',
              },
            ],
            images: data.images || [],
          },
        },
      })

      if (response.data?.productCreate?.userErrors?.length > 0) {
        return NextResponse.json(
          { error: response.data.productCreate.userErrors[0].message },
          { status: 400 }
        )
      }

      return NextResponse.json({ success: true, data: response.data })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: error.message || 'Error updating product' },
      { status: 500 }
    )
  }
}


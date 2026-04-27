import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from '@/lib/admin-queries'

type AdminProductResponse = Record<string, unknown>

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || null
    const productId = searchParams.get('id')

    if (productId) {
      // Fetch a specific product
      const response = await shopifyAdminFetch<AdminProductResponse>({
        query: GET_PRODUCT_QUERY,
        variables: { id: productId },
      })

      return NextResponse.json(response.data)
    }

    // Fetch products list
    const response = await shopifyAdminFetch<Record<string, unknown>>({
      query: GET_PRODUCTS_QUERY,
      variables: { first, after },
    })

    return NextResponse.json(response.data)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const message =
      error instanceof Error && error.message ? error.message : 'Error fetching products'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}


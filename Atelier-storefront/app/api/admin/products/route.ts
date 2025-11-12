import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from '@/lib/admin-queries'

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || null
    const productId = searchParams.get('id')

    if (productId) {
      // Fetch a specific product
      const response = await shopifyAdminFetch({
        query: GET_PRODUCT_QUERY,
        variables: { id: productId },
      })

      return NextResponse.json(response.data)
    }

    // Fetch products list
    const response = await shopifyAdminFetch({
      query: GET_PRODUCTS_QUERY,
      variables: { first, after },
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: error.message || 'Error fetching products' },
      { status: 500 }
    )
  }
}


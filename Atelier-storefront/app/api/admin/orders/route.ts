import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import { GET_ORDERS_QUERY, GET_ORDER_QUERY } from '@/lib/admin-queries'

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || null
    const orderId = searchParams.get('id')

    if (orderId) {
      // Fetch a specific order
      const response = await shopifyAdminFetch({
        query: GET_ORDER_QUERY,
        variables: { id: orderId },
      })

      return NextResponse.json(response.data)
    }

    // Fetch orders list
    const response = await shopifyAdminFetch({
      query: GET_ORDERS_QUERY,
      variables: { first, after },
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: error.message || 'Error fetching orders' },
      { status: 500 }
    )
  }
}


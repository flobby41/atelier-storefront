import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import { GET_ORDERS_QUERY, GET_ORDER_QUERY } from '@/lib/admin-queries'

type AdminOrderResponse = Record<string, unknown>

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || null
    const orderId = searchParams.get('id')

    if (orderId) {
      // Fetch a specific order
      const response = await shopifyAdminFetch<AdminOrderResponse>({
        query: GET_ORDER_QUERY,
        variables: { id: orderId },
      })

      return NextResponse.json(response.data)
    }

    // Fetch orders list
    const response = await shopifyAdminFetch<Record<string, unknown>>({
      query: GET_ORDERS_QUERY,
      variables: { first, after },
    })

    return NextResponse.json(response.data)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const message =
      error instanceof Error && error.message ? error.message : 'Error fetching orders'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}


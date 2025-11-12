import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import { GET_SHOP_STATS_QUERY, GET_PRODUCTS_QUERY, GET_ORDERS_QUERY, GET_CUSTOMERS_QUERY } from '@/lib/admin-queries'

export async function GET() {
  try {
    await requireAdminAuth()

    // Fetch basic statistics
    const [shopStats, products, orders, customers] = await Promise.all([
      shopifyAdminFetch({ query: GET_SHOP_STATS_QUERY }),
      shopifyAdminFetch({ query: GET_PRODUCTS_QUERY, variables: { first: 1 } }),
      shopifyAdminFetch({ query: GET_ORDERS_QUERY, variables: { first: 1 } }),
      shopifyAdminFetch({ query: GET_CUSTOMERS_QUERY, variables: { first: 1 } }),
    ])

    // Note: To get real totals, paginated queries would be needed
    // Here we just return basic indicators
    return NextResponse.json({
      shop: shopStats.data?.shop,
      hasProducts: products.data?.products?.pageInfo?.hasNextPage !== undefined,
      hasOrders: orders.data?.orders?.pageInfo?.hasNextPage !== undefined,
      hasCustomers: customers.data?.customers?.pageInfo?.hasNextPage !== undefined,
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json(
      { error: error.message || 'Error fetching statistics' },
      { status: 500 }
    )
  }
}


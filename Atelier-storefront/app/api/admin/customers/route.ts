import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { shopifyAdminFetch } from '@/lib/shopify-admin'
import { GET_CUSTOMERS_QUERY, GET_CUSTOMER_QUERY } from '@/lib/admin-queries'

type AdminCustomerResponse = Record<string, unknown>

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || null
    const customerId = searchParams.get('id')

    if (customerId) {
      // Fetch a specific customer
      const response = await shopifyAdminFetch<AdminCustomerResponse>({
        query: GET_CUSTOMER_QUERY,
        variables: { id: customerId },
      })

      return NextResponse.json(response.data)
    }

    // Fetch customers list
    const response = await shopifyAdminFetch<Record<string, unknown>>({
      query: GET_CUSTOMERS_QUERY,
      variables: { first, after },
    })

    return NextResponse.json(response.data)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const message =
      error instanceof Error && error.message ? error.message : 'Error fetching customers'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}


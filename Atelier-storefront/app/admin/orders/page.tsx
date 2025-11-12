'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Calendar, DollarSign, Package, User, Mail } from 'lucide-react'

interface Order {
  id: string
  name: string
  email: string
  createdAt: string
  totalPriceSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
  fulfillmentStatus: string
  financialStatus: string
  customer: {
    id: string
    firstName: string
    lastName: string
    email: string
  } | null
  lineItems: {
    edges: Array<{
      node: {
        id: string
        title: string
        quantity: number
        originalUnitPriceSet: {
          shopMoney: {
            amount: string
            currencyCode: string
          }
        }
      }
    }>
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders?first=50')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders?.edges?.map((edge: any) => edge.node) || [])
      } else {
        toast.error('Error loading orders')
      }
    } catch (error) {
      toast.error('Error loading orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      FULFILLED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      UNFULFILLED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      PARTIAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      PAID: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      }`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your Shopify orders
        </p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {order.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(order.fulfillmentStatus)}
                    {getStatusBadge(order.financialStatus)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <DollarSign className="h-5 w-5" />
                    {order.totalPriceSet.shopMoney.amount} {order.totalPriceSet.shopMoney.currencyCode}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  {order.customer && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>
                        {order.customer.firstName} {order.customer.lastName}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{order.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(order.createdAt).toLocaleDateString('en-US')}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Items:</p>
                  <div className="space-y-2">
                    {order.lineItems.edges.map((item) => (
                      <div key={item.node.id} className="flex justify-between text-sm">
                        <span>
                          {item.node.title} x{item.node.quantity}
                        </span>
                        <span className="text-gray-500">
                          {item.node.originalUnitPriceSet.shopMoney.amount} {item.node.originalUnitPriceSet.shopMoney.currencyCode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {orders.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No orders found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


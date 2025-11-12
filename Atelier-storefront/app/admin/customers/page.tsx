'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, Phone, MapPin, DollarSign } from 'lucide-react'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: string
  numberOfOrders: number
  totalSpent: string
  addresses: Array<{
    address1: string
    city: string
    province: string
    country: string
    zip: string
  }>
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers?first=50')
      if (response.ok) {
        const data = await response.json()
        setCustomers(data.customers?.edges?.map((edge: any) => edge.node) || [])
      } else {
        toast.error('Error loading customers')
      }
    } catch (error) {
      toast.error('Error loading customers')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your Shopify customers
        </p>
      </div>

      <div className="grid gap-4">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle>
                {customer.firstName} {customer.lastName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{customer.phone}</span>
                  </div>
                )}
                {customer.addresses && customer.addresses.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      {customer.addresses.map((addr, idx) => (
                        <div key={idx}>
                          {addr.address1}, {addr.city} {addr.zip}, {addr.country}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>{customer.totalSpent}</strong> spent
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {customer.numberOfOrders} order{customer.numberOfOrders !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {customers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No customers found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


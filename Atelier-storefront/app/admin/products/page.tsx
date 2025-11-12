'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Plus, Edit, DollarSign, Package } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Product {
  id: string
  title: string
  handle: string
  status: string
  totalInventory: number
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        price: string
        inventoryQuantity: number
        sku: string
      }
    }>
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string
      }
    }>
  }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products?first=50')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products?.edges?.map((edge: any) => edge.node) || [])
      } else {
        toast.error('Error loading products')
      }
    } catch (error) {
      toast.error('Error loading products')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async () => {
    try {
      const response = await fetch('/api/admin/products/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createProduct',
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
        }),
      })

      if (response.ok) {
        toast.success('Product created successfully')
        setCreateDialogOpen(false)
        setNewProduct({ title: '', description: '', price: '' })
        fetchProducts()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Error creating product')
      }
    } catch (error) {
      toast.error('Error creating product')
    }
  }

  const handleUpdatePrice = async (variantId: string, newPrice: string) => {
    try {
      const response = await fetch('/api/admin/products/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updatePrice',
          variantId,
          price: newPrice,
        }),
      })

      if (response.ok) {
        toast.success('Price updated')
        fetchProducts()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Error updating price')
      }
    } catch (error) {
      toast.error('Error updating price')
    }
  }

  const handleUpdateInventory = async (inventoryItemId: string, locationId: string, quantity: number) => {
    try {
      const response = await fetch('/api/admin/products/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateInventory',
          inventoryItemId,
          locationId,
          quantity,
        }),
      })

      if (response.ok) {
        toast.success('Inventory updated')
        fetchProducts()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Error updating inventory')
      }
    } catch (error) {
      toast.error('Error updating inventory')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your Shopify products
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your store
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <Button onClick={handleCreateProduct} className="w-full">
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Total inventory: {product.totalInventory}
                  </p>
                </div>
                {product.images.edges[0] && (
                  <img
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.variants.edges.map((variant) => (
                  <div key={variant.node.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{variant.node.title}</p>
                      <p className="text-sm text-gray-500">
                        SKU: {variant.node.sku || 'N/A'} | Inventory: {variant.node.inventoryQuantity}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Price
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Price</DialogTitle>
                          </DialogHeader>
                          <PriceUpdateForm
                            currentPrice={variant.node.price}
                            onUpdate={(newPrice) => handleUpdatePrice(variant.node.id, newPrice)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-1" />
                            Inventory
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Inventory</DialogTitle>
                          </DialogHeader>
                          <InventoryUpdateForm
                            currentQuantity={variant.node.inventoryQuantity}
                            onUpdate={(locationId, quantity) => {
                              // Note: You'll need to retrieve inventoryItemId and locationId from the API
                              // For now, this is a placeholder
                              toast.info('Feature to be implemented with inventoryItemId')
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PriceUpdateForm({ currentPrice, onUpdate }: { currentPrice: string; onUpdate: (price: string) => void }) {
  const [price, setPrice] = useState(currentPrice)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">New Price</label>
        <Input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button onClick={() => onUpdate(price)} className="w-full">
        Update
      </Button>
    </div>
  )
}

function InventoryUpdateForm({ 
  currentQuantity, 
  onUpdate 
}: { 
  currentQuantity: number
  onUpdate: (locationId: string, quantity: number) => void 
}) {
  const [quantity, setQuantity] = useState(currentQuantity.toString())
  const [locationId, setLocationId] = useState('')

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Location ID</label>
        <Input
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          placeholder="Location ID"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <Button onClick={() => onUpdate(locationId, parseInt(quantity))} className="w-full">
        Update
      </Button>
    </div>
  )
}


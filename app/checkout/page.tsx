"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = 15
  const tax = total * 0.1
  const finalTotal = total + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    setIsProcessing(false)
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container max-w-2xl mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl mb-4 text-balance">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart to checkout</p>
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl mb-12 text-balance">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Forms */}
              <div className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-serif mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required className="mt-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Shipping Information */}
                <div>
                  <h2 className="text-xl font-serif mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required className="mt-2" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Fashion Street" required className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Paris" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="postal">Postal Code</Label>
                        <Input id="postal" placeholder="75001" required className="mt-2" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="France" required className="mt-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Information */}
                <div>
                  <h2 className="text-xl font-serif mb-6">Payment Method</h2>
                  <RadioGroup defaultValue="card" className="mb-6">
                    <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-4 w-4" />
                        Credit Card
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-2"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required className="mt-2" maxLength={5} />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required className="mt-2" maxLength={3} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <div className="lg:sticky lg:top-24">
                  <div className="border border-border rounded-lg p-6">
                    <h2 className="text-xl font-serif mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-light text-sm mb-1 leading-tight">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">Qty: {item.quantity}</p>
                            <p className="text-sm font-mono">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-mono">${total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-mono">${shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-mono">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg tracking-wider uppercase">Total</span>
                      <span className="text-2xl font-mono">${finalTotal.toFixed(2)}</span>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By placing your order, you agree to our terms and conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

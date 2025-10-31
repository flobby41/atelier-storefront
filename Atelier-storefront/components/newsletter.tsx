"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-4">Join Our World</h2>
          <p className="text-muted-foreground font-light mb-8 leading-relaxed">
            Be the first to discover new collections, exclusive collaborations, and behind-the-scenes stories from our
            atelier.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-background"
            />
            <Button type="submit" className="tracking-widest">
              SUBSCRIBE
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

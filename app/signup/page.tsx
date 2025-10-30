import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Create Account</h1>
            <p className="text-muted-foreground font-light">Join us to discover avant-garde fashion</p>
          </div>

          <div className="bg-card border border-border rounded-sm p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-light tracking-wide">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="h-12 bg-background border-border rounded-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-light tracking-wide">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-12 bg-background border-border rounded-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-light tracking-wide">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-background border-border rounded-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-light tracking-wide">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-background border-border rounded-sm"
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-border" required />
                <Label htmlFor="terms" className="text-xs font-light text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-foreground hover:text-accent transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-foreground hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-sm font-light tracking-wide"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm font-light text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-foreground hover:text-accent transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs font-light text-muted-foreground text-center mb-4">Or sign up with</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 rounded-sm font-light bg-transparent" type="button">
                  Google
                </Button>
                <Button variant="outline" className="h-11 rounded-sm font-light bg-transparent" type="button">
                  Apple
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

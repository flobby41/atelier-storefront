import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Welcome Back</h1>
            <p className="text-muted-foreground font-light">Sign in to your account to continue</p>
          </div>

          <div className="bg-card border border-border rounded-sm p-8">
            <form className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-light tracking-wide">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-light text-muted-foreground hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-background border-border rounded-sm"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-sm font-light tracking-wide"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm font-light text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-foreground hover:text-accent transition-colors">
                  Create one
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs font-light text-muted-foreground text-center mb-4">Or continue with</p>
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

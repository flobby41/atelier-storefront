import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-light tracking-wider mb-4">ATELIER</h3>
            <p className="text-sm font-light leading-relaxed opacity-80">
              Contemporary fashion for the avant-garde soul.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 opacity-80">Shop</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/newarrivals" className="hover:opacity-70 transition-opacity">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:opacity-70 transition-opacity">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:opacity-70 transition-opacity">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:opacity-70 transition-opacity">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 opacity-80">About</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/about" className="hover:opacity-70 transition-opacity">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:opacity-70 transition-opacity">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:opacity-70 transition-opacity">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-70 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 opacity-80">Support</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/shipping" className="hover:opacity-70 transition-opacity">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:opacity-70 transition-opacity">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-70 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:opacity-70 transition-opacity">
                  Care Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light opacity-80">
          <p>© 2025 ATELIER. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">
              Privacy
            </Link>
            <Link href="/terms" className="hover:opacity-70 transition-opacity">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:opacity-70 transition-opacity">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

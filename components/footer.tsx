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
            <h4 className="text-sm tracking-widest uppercase mb-4 opacity-80">
              Shop
            </h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a href="#new" className="hover:opacity-70 transition-opacity">
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#women"
                  className="hover:opacity-70 transition-opacity"
                >
                  Women
                </a>
              </li>
              <li>
                <a href="#men" className="hover:opacity-70 transition-opacity">
                  Men
                </a>
              </li>
              <li>
                <a href="#sale" className="hover:opacity-70 transition-opacity">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 opacity-80">
              About
            </h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a
                  href="#story"
                  className="hover:opacity-70 transition-opacity"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#sustainability"
                  className="hover:opacity-70 transition-opacity"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#stores"
                  className="hover:opacity-70 transition-opacity"
                >
                  Stores
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:opacity-70 transition-opacity"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4 opacity-80">
              Support
            </h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a
                  href="#shipping"
                  className="hover:opacity-70 transition-opacity"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#returns"
                  className="hover:opacity-70 transition-opacity"
                >
                  Returns
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:opacity-70 transition-opacity">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#care" className="hover:opacity-70 transition-opacity">
                  Care Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light opacity-80">
          <p>© 2025 ATELIER. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:opacity-70 transition-opacity">
              Privacy
            </a>
            <a href="#terms" className="hover:opacity-70 transition-opacity">
              Terms
            </a>
            <a
              href="#accessibility"
              className="hover:opacity-70 transition-opacity"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

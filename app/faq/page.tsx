import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Frequently Asked Questions
            </h1>

            <Accordion type="single" collapsible className="mt-16">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  How do I determine my size?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  We provide detailed size guides on each product page. Our garments are designed with a contemporary
                  fit. If you're between sizes, we recommend sizing up for a more relaxed fit or sizing down for a
                  closer fit.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  Do you offer international shipping?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination.
                  International orders may be subject to customs duties and taxes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  What is your return policy?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original
                  condition with tags attached. We offer free returns for domestic orders.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  How long does shipping take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  Domestic orders typically arrive within 5-7 business days with standard shipping. Express and next-day
                  options are available. International shipping takes 7-28 business days depending on destination.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  Are your materials sustainable?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  Yes, we are committed to sustainability. We use certified organic materials, ethical production
                  methods, and maintain carbon-neutral operations. Learn more on our Sustainability page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  Can I track my order?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  Yes, once your order ships, you'll receive a tracking number via email. You can also track your order
                  by logging into your account and viewing your order history.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  Do you offer gift wrapping?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  Yes, we offer complimentary gift wrapping on all orders. Simply select the gift wrapping option at
                  checkout and include a personalized message.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left font-light tracking-wide">
                  How do I care for my garments?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                  Each garment comes with specific care instructions on the label. Generally, we recommend dry cleaning
                  or gentle hand washing for our pieces. Visit our Care Guide page for detailed information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

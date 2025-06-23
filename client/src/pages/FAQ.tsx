import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "We offer free standard shipping (5-7 business days) on orders over $50. Express shipping (2-3 business days) is available for $9.99, and overnight shipping for $19.99."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within the United States. We're working on expanding international shipping options soon."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard."
      }
    ]
  },
  {
    category: "Products",
    questions: [
      {
        question: "What types of wax do you use?",
        answer: "We use premium soy wax, coconut wax, and beeswax blends. All our candles are made with natural, eco-friendly materials and cotton wicks."
      },
      {
        question: "How long do your candles burn?",
        answer: "Burn times vary by candle size: Small (8oz) - 45-50 hours, Medium (12oz) - 65-75 hours, Large (16oz) - 85-95 hours."
      },
      {
        question: "Are your candles safe for pets?",
        answer: "Yes! Our candles are made with natural soy wax and essential oils that are pet-safe. However, always keep lit candles away from pets and never leave them unattended."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unused candles in original packaging. If you're not satisfied with your purchase, we'll provide a full refund or exchange."
      },
      {
        question: "Can I exchange a scent I don't like?",
        answer: "Absolutely! If you're not happy with a scent, you can exchange it within 30 days for any other candle of equal or lesser value."
      },
      {
        question: "What if my candle arrives damaged?",
        answer: "We package our candles carefully, but if yours arrives damaged, contact us within 7 days and we'll send a replacement at no charge."
      }
    ]
  },
  {
    category: "Account & Payments",
    questions: [
      {
        question: "Do I need an account to make a purchase?",
        answer: "While you can browse our products without an account, you'll need to sign in to make purchases and track your orders."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient-brand mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our candles, shipping, returns, and more.
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-brand-primary/20 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    {category.category}
                  </CardTitle>
                  <CardDescription>
                    Everything you need to know about {category.category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-brand-primary/10"
                      >
                        <AccordionTrigger className="text-left hover:text-brand-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-brand-soft p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
              <p className="mb-6">
                Can't find what you're looking for? Our customer service team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-white text-brand-primary px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Contact Us
                </a>
                <a 
                  href="mailto:support@waxheave.com" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-primary transition-all"
                >
                  Email Support
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
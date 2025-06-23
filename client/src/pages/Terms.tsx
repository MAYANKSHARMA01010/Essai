import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient-brand mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: June 18, 2025
            </p>
          </div>

          <Card className="border-brand-primary/20 bg-card/50 backdrop-blur">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using WaxHeave's website and services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our website, products, and services.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">2. Products and Services</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    WaxHeave provides premium handcrafted candles and related accessories. All product descriptions, prices, and availability are subject to change without notice.
                  </p>
                  <p>
                    We reserve the right to limit quantities, discontinue products, or refuse service to anyone at our sole discretion.
                  </p>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">3. Orders and Payment</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    By placing an order, you offer to purchase products subject to these terms. All orders are subject to availability and confirmation of the order price.
                  </p>
                  <p>
                    Payment must be received by us before the dispatch of goods. We accept major credit cards, PayPal, and other payment methods as displayed during checkout.
                  </p>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">4. Shipping and Returns</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We aim to dispatch orders within 1-2 business days. Shipping times vary based on location and selected shipping method. Risk of loss passes to you upon delivery.
                  </p>
                  <p>
                    Returns are accepted within 30 days of purchase for unused items in original packaging. Return shipping costs are the responsibility of the customer unless the item was defective or incorrectly shipped.
                  </p>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">5. User Account</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    To make purchases, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                  <p>
                    You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                  </p>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">6. Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  WaxHeave shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services, even if we have been advised of the possibility of such damages.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to update these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes are posted constitutes acceptance of the updated terms.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">9. Contact Information</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p><strong>Email:</strong> legal@waxheave.com</p>
                    <p><strong>Address:</strong> WaxHeave Customer Service</p>
                    <p className="ml-16">123 Candle Way</p>
                    <p className="ml-16">Scent Valley, CA 90210</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
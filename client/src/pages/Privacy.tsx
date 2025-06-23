import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient-brand mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: June 18, 2025
            </p>
          </div>

          <Card className="border-brand-primary/20 bg-card/50 backdrop-blur">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal information (name, email address, phone number)</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely by our payment providers)</li>
                    <li>Order history and preferences</li>
                    <li>Communications with our customer service team</li>
                  </ul>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">How We Use Your Information</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and account</li>
                    <li>Provide customer support</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our products and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Information Sharing</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Service providers who assist us in operating our business</li>
                    <li>Payment processors for secure transaction processing</li>
                    <li>Shipping companies to deliver your orders</li>
                    <li>When required by law or to protect our rights</li>
                  </ul>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption for data transmission and secure storage of your information.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Cookies and Tracking</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
                  </p>
                  <p>
                    We may also use third-party analytics services to help us understand how our website is used.
                  </p>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Your Rights</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your personal information</li>
                    <li>Object to processing of your personal information</li>
                  </ul>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold text-brand-primary mb-4">Contact Us</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p><strong>Email:</strong> privacy@waxheave.com</p>
                    <p><strong>Phone:</strong> 1-800-WAX-HEAV</p>
                    <p><strong>Address:</strong> WaxHeave Privacy Officer</p>
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
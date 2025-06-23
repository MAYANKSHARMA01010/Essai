import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Heart,
  Star,
  Gift,
  HelpCircle
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartOpen, setCartOpen } = useCartStore();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@waxheave.com",
      description: "We typically respond within 24 hours",
      action: "mailto:hello@waxheave.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Monday - Friday, 9 AM - 6 PM EST",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Our Studio",
      content: "123 Artisan Lane, Creative District",
      description: "By appointment only",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Fri: 9 AM - 6 PM EST",
      description: "Closed weekends and holidays",
      action: "#"
    }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "orders", label: "Order Support", icon: Gift },
    { value: "products", label: "Product Questions", icon: Star },
    { value: "custom", label: "Custom Orders", icon: Heart },
    { value: "wholesale", label: "Wholesale", icon: HelpCircle },
  ];

  const faqs = [
    {
      question: "How long do your candles burn?",
      answer: "Our candles typically burn for 60-80 hours depending on the size and type. Travel candles burn for approximately 15 hours."
    },
    {
      question: "Do you offer custom scents?",
      answer: "Yes! We offer custom scent creation for orders of 50+ candles. Contact us to discuss your unique fragrance vision."
    },
    {
      question: "What wax do you use?",
      answer: "We use premium natural waxes including soy wax, beeswax, and coconut wax. All our waxes are sustainably sourced."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by destination."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-pink via-white to-soft-pink">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-purple via-medium-purple to-mauve-purple py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
            Get in <span className="text-gradient-pink animate-flicker">Touch</span>
          </h1>
          <p className="text-xl text-pale-pink mb-8 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have questions about our products, need support, or want to explore custom orders, our team is here to help.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Badge className="bg-soft-pink text-primary-purple px-6 py-3 text-lg font-semibold">
              24hr Response Time
            </Badge>
            <Badge className="bg-light-mauve text-white px-6 py-3 text-lg font-semibold">
              Expert Support Team
            </Badge>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={index}
                  className="text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-light-mauve/20 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => info.action !== "#" && window.open(info.action, '_blank')}
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-mauve rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-purple mb-2">{info.title}</h3>
                    <p className="text-medium-purple font-medium mb-1">{info.content}</p>
                    <p className="text-sm text-warm-gray">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="shadow-xl border-light-mauve/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary-purple flex items-center gap-3">
                    <Send className="h-6 w-6" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-medium-purple">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-purple font-medium">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your full name" 
                                  className="border-light-mauve focus:ring-mauve-purple focus:border-mauve-purple"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-purple font-medium">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your@email.com"
                                  className="border-light-mauve focus:ring-mauve-purple focus:border-mauve-purple"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-purple font-medium">Type of Inquiry</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {inquiryTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                  <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => field.onChange(type.value)}
                                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center gap-2 text-sm ${
                                      field.value === type.value
                                        ? 'border-mauve-purple bg-mauve-purple text-white'
                                        : 'border-light-mauve text-medium-purple hover:border-mauve-purple'
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                    {type.label}
                                  </button>
                                );
                              })}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-purple font-medium">Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What can we help you with?"
                                className="border-light-mauve focus:ring-mauve-purple focus:border-mauve-purple"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-purple font-medium">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us more about your inquiry..."
                                rows={5}
                                className="border-light-mauve focus:ring-mauve-purple focus:border-mauve-purple resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-mauve hover:bg-gradient-purple text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary-purple mb-4">Frequently Asked Questions</h2>
                <p className="text-medium-purple">
                  Find quick answers to common questions about our products and services.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card 
                    key={index} 
                    className="border-light-mauve/20 hover:shadow-lg transition-shadow duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-primary-purple mb-3 flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-mauve-purple mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-medium-purple leading-relaxed pl-8">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-gradient-to-r from-soft-pink to-pale-pink border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-primary-purple mb-2">Still have questions?</h3>
                  <p className="text-medium-purple mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <Button className="bg-gradient-mauve hover:bg-gradient-purple text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start a Conversation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="py-16 bg-gradient-to-r from-primary-purple via-medium-purple to-mauve-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Visit Our Artisan Studio</h2>
          <p className="text-pale-pink text-lg mb-8 max-w-2xl mx-auto">
            Experience the magic of candle-making firsthand. Schedule a visit to our studio and see how our artisans craft each candle with passion and precision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-soft-pink mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-pale-pink">123 Artisan Lane<br />Creative District, NY 10001</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-soft-pink mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Studio Hours</h3>
              <p className="text-pale-pink">Tuesday - Saturday<br />10 AM - 4 PM</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-soft-pink mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Book a Visit</h3>
              <p className="text-pale-pink">Call us at<br />+1 (555) 123-4567</p>
            </div>
          </div>
          <Button className="bg-soft-pink text-primary-purple hover:bg-pale-pink px-8 py-3 text-lg font-semibold">
            Schedule Studio Visit
          </Button>
        </div>
      </section>

      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
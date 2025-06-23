import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Search, ShoppingCart, User, Menu, Star, Shield, Truck, Heart } from "lucide-react";
import Navbar from "@/components/navbar";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "login";
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Flame className="text-warm-amber text-2xl mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">WaxHeave</h1>
            </div>

            {/* Navigation */}
            <Navbar />

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogin}>
                <User className="h-4 w-4 mr-1" />
                Login
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="/Home" className="block py-2 text-gray-700 hover:text-warm-amber">Home</a>
              <a href="#products" className="block py-2 text-gray-700 hover:text-warm-amber">Shop</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-warm-amber">Collections</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-warm-amber">About</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-warm-amber">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-soft-cream to-warm-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Light Up Your Life with{" "}
                <span className="text-warm-amber">Premium Candles</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover our handcrafted collection of premium candles, made with natural wax and carefully selected fragrances to create the perfect ambiance for every moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-warm-amber text-white hover:bg-deep-amber px-8 py-4 text-lg"
                  onClick={handleLogin}
                >
                  Shop Collection
                </Button>
                <Button 
                  variant="outline" 
                  className="border-warm-amber text-warm-amber hover:bg-warm-amber hover:text-white px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Premium candles with warm ambiance"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose WaxHeave?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the finest candles crafted with love and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600">Handcrafted with the finest natural waxes and premium fragrances from around the world.</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Ingredients</h3>
                <p className="text-gray-600">Made with 100% natural soy wax, beeswax, and coconut wax for clean, long-lasting burns.</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
                <p className="text-gray-600">Free shipping on orders over $50 with fast, reliable delivery to your doorstep.</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Handcrafted</h3>
                <p className="text-gray-600">Each candle is lovingly handmade by our skilled artisans with attention to every detail.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Collections</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover carefully curated collections designed for every mood, season, and special moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group cursor-pointer" onClick={handleLogin}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Luxury Collection"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Luxury Collection</h3>
                  <p className="text-sm opacity-90 mb-3">Premium fragrances for discerning tastes</p>
                  <span className="inline-block px-4 py-2 bg-warm-amber text-white rounded-full text-sm font-semibold">
                    From $38.99
                  </span>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer" onClick={handleLogin}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Seasonal Collection"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Seasonal Collection</h3>
                  <p className="text-sm opacity-90 mb-3">Capture the essence of every season</p>
                  <span className="inline-block px-4 py-2 bg-warm-amber text-white rounded-full text-sm font-semibold">
                    From $24.99
                  </span>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer" onClick={handleLogin}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Gift Sets"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Gift Sets</h3>
                  <p className="text-sm opacity-90 mb-3">Perfect presents for loved ones</p>
                  <span className="inline-block px-4 py-2 bg-warm-amber text-white rounded-full text-sm font-semibold">
                    From $69.99
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Join thousands of satisfied customers who love WaxHeave candles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The Vanilla Dreams candle is absolutely incredible! The scent fills my entire living room and lasts for hours. Best candle purchase I've ever made."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "I ordered the Romance Set as an anniversary gift and my wife absolutely loved it! The packaging was beautiful and the candles smell amazing."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Fast shipping and excellent customer service. The Lavender Fields candle helps me relax after long work days. Will definitely order again!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center text-white font-semibold">
                    E
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-warm-amber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-sm md:text-base opacity-90">Happy Customers</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-sm md:text-base opacity-90">Unique Fragrances</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">5★</div>
              <div className="text-sm md:text-base opacity-90">Average Rating</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">24H</div>
              <div className="text-sm md:text-base opacity-90">Fast Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-warm-amber py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who have discovered the magic of WaxHeave candles.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-warm-amber hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            onClick={handleLogin}
          >
            Start Shopping Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Flame className="text-warm-amber text-2xl mr-2" />
                <h3 className="text-xl font-bold">WaxHeave</h3>
              </div>
              <p className="text-gray-400 mb-6">Creating magical moments with premium handcrafted candles.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Shop</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">All Candles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">Scented Candles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">Unscented Candles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">Gift Sets</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-warm-amber transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
              <div className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-warm-amber text-white hover:bg-deep-amber">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WaxHeave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

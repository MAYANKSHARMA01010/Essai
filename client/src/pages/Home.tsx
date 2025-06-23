import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import type { Product } from "@shared/schema";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { cartOpen, setCartOpen } = useCartStore();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "scented") return matchesSearch && product.isScented;
    if (selectedFilter === "unscented") return matchesSearch && !product.isScented;
    if (selectedFilter === "soy") return matchesSearch && product.waxType === "soy";
    if (selectedFilter === "beeswax") return matchesSearch && product.waxType === "beeswax";
    if (selectedFilter === "coconut") return matchesSearch && product.waxType === "coconut";
    if (selectedFilter === "luxury") return matchesSearch && product.category === "luxury";
    if (selectedFilter === "seasonal") return matchesSearch && product.category === "seasonal";
    if (selectedFilter === "gift-set") return matchesSearch && product.category === "gift-set";
    if (selectedFilter === "travel") return matchesSearch && product.category === "travel";
    if (selectedFilter === "wellness") return matchesSearch && product.category === "wellness";
    
    return matchesSearch;
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "scented", label: "Scented" },
    { id: "unscented", label: "Unscented" },
    { id: "luxury", label: "Luxury" },
    { id: "seasonal", label: "Seasonal" },
    { id: "gift-set", label: "Gift Sets" },
    { id: "travel", label: "Travel Size" },
    { id: "wellness", label: "Wellness" },
    { id: "soy", label: "Soy Wax" },
    { id: "beeswax", label: "Beeswax" },
    { id: "coconut", label: "Coconut Wax" },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
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
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
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

      {/* Products Section */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Candle Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium candles, each crafted with love and attention to detail.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Input
                  type="text"
                  placeholder="Search candles by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-light-amber focus:ring-amber-glow focus:border-amber-glow transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-amber h-5 w-5" />
              </div>
              
              <div className="flex items-center gap-3 text-sm text-warm-gray">
                <span>{filteredProducts.length} products found</span>
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="text-warm-amber hover:text-deep-amber"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className={
                    selectedFilter === filter.id
                      ? "bg-gradient-warm hover:bg-gradient-glow text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                      : "border-light-amber text-warm-gray hover:bg-warm-amber hover:text-white hover:border-warm-amber transition-all duration-300"
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-full h-64 bg-gradient-to-br from-soft-cream to-warm-cream">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-glow rounded-full animate-float"></div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-gradient-shift"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-gradient-shift" style={{ animationDelay: '0.2s' }}></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gradient-to-r from-warm-amber to-deep-amber rounded w-20 animate-gradient-shift" style={{ animationDelay: '0.4s' }}></div>
                      <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-gradient-shift" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="relative mb-6">
                <Search className="h-16 w-16 text-warm-amber mx-auto animate-float" />
                <div className="absolute inset-0">
                  <Search className="h-16 w-16 text-amber-glow mx-auto opacity-50 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No candles found</h3>
              <p className="text-warm-gray mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
                className="bg-warm-amber hover:bg-deep-amber text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="py-16 bg-gradient-to-br from-warm-white to-soft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Collections</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover carefully curated collections designed for every mood and moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group cursor-pointer" onClick={() => setSelectedFilter("luxury")}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Luxury Collection"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Luxury Collection</h3>
                  <p className="text-sm opacity-90">Premium fragrances for discerning tastes</p>
                  <span className="inline-block mt-2 text-warm-amber font-semibold">From $38.99</span>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer" onClick={() => setSelectedFilter("seasonal")}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Seasonal Collection"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Seasonal Collection</h3>
                  <p className="text-sm opacity-90">Capture the essence of every season</p>
                  <span className="inline-block mt-2 text-warm-amber font-semibold">From $24.99</span>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer" onClick={() => setSelectedFilter("gift-set")}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Gift Sets"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Gift Sets</h3>
                  <p className="text-sm opacity-90">Perfect presents for loved ones</p>
                  <span className="inline-block mt-2 text-warm-amber font-semibold">From $69.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose WaxHeave */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The WaxHeave Difference</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the finest candles crafted with love and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Handcrafted with the finest natural waxes and premium fragrances from around the world.</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Ingredients</h3>
              <p className="text-gray-600 text-sm">Made with 100% natural soy wax, beeswax, and coconut wax for clean, long-lasting burns.</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm">Free shipping on orders over $50 with fast, reliable delivery to your doorstep.</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-amber rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Handcrafted</h3>
              <p className="text-gray-600 text-sm">Each candle is lovingly handmade by our skilled artisans with attention to every detail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Join thousands of satisfied customers who love WaxHeave candles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The Vanilla Dreams candle is absolutely incredible! The scent fills my entire living room and lasts for hours. Best candle purchase I've ever made."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"I ordered the Romance Set as an anniversary gift and my wife absolutely loved it! The packaging was beautiful and the candles smell amazing."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-600">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Fast shipping and excellent customer service. The Lavender Fields candle helps me relax after long work days. Will definitely order again!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center text-white font-semibold">
                  E
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                  <p className="text-sm text-gray-600">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-warm-amber">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Glow
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get exclusive offers, candle care tips, and be the first to know about new collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-warm-amber hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            Join 10,000+ candle lovers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

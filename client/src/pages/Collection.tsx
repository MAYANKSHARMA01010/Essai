import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Gift, Leaf, Sun, Moon, Star, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import type { Product } from "@shared/schema";

export default function Collection() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { cartOpen, setCartOpen } = useCartStore();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const collections = [
    {
      id: "luxury",
      name: "Luxury Collection",
      description: "Premium fragrances crafted with the finest ingredients for those who appreciate the extraordinary.",
      icon: Sparkles,
      gradient: "bg-gradient-purple",
      textColor: "text-white",
      category: "luxury",
      price: "From $38.99",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "wellness",
      name: "Wellness & Aromatherapy",
      description: "Therapeutic scents designed to promote relaxation, focus, and well-being through natural aromatherapy.",
      icon: Leaf,
      gradient: "bg-gradient-mauve",
      textColor: "text-white",
      category: "wellness",
      price: "From $25.99",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "romance",
      name: "Romance Collection",
      description: "Intimate and sensual fragrances perfect for creating romantic atmospheres and special moments.",
      icon: Heart,
      gradient: "bg-gradient-pink",
      textColor: "text-primary-purple",
      category: "romance",
      price: "From $29.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "seasonal",
      name: "Seasonal Favorites",
      description: "Capture the essence of each season with our rotating collection of seasonal signature scents.",
      icon: Sun,
      gradient: "bg-gradient-warm",
      textColor: "text-white",
      category: "seasonal",
      price: "From $24.99",
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "fresh",
      name: "Fresh & Clean",
      description: "Crisp, clean scents that invigorate your space with fresh air and natural clarity.",
      icon: Moon,
      gradient: "bg-gradient-glow",
      textColor: "text-primary-purple",
      category: "fresh",
      price: "From $21.99",
      image: "https://images.unsplash.com/photo-1602080969885-18bbf5ac4064?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "comfort",
      name: "Comfort & Cozy",
      description: "Warm, comforting scents that transform your home into a cozy sanctuary of peace and tranquility.",
      icon: Star,
      gradient: "bg-gradient-flame",
      textColor: "text-white",
      category: "comfort",
      price: "From $23.99",
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const getCollectionProducts = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-pink via-white to-soft-pink">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-purple via-medium-purple to-mauve-purple py-24">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-scale-in">
            Curated <span className="text-gradient-pink animate-flicker">Collections</span>
          </h1>
          <p className="text-xl text-pale-pink mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover thoughtfully curated collections designed for every mood, moment, and space. Each collection tells a unique story through carefully selected fragrances.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Badge className="bg-soft-pink text-primary-purple px-6 py-3 text-lg font-semibold animate-scale-in">
              {collections.length} Unique Collections
            </Badge>
            <Badge className="bg-light-mauve text-white px-6 py-3 text-lg font-semibold animate-scale-in" style={{ animationDelay: '0.2s' }}>
              Premium Quality Guaranteed
            </Badge>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-purple mb-4">Explore Our Collections</h2>
            <p className="text-lg text-medium-purple max-w-2xl mx-auto">
              Each collection is carefully crafted to evoke specific emotions and create unique atmospheric experiences in your space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {collections.map((collection, index) => {
              const Icon = collection.icon;
              const collectionProducts = getCollectionProducts(collection.category);
              
              return (
                <Card 
                  key={collection.id} 
                  className="group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 ${collection.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Collection Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-full ${collection.textColor === 'text-white' ? 'bg-white/20' : 'bg-primary-purple/20'} backdrop-blur-sm`}>
                          <Icon className={`h-6 w-6 ${collection.textColor}`} />
                        </div>
                        <Badge className="bg-white/90 text-primary-purple px-3 py-1 text-sm font-semibold">
                          {collectionProducts.length} Products
                        </Badge>
                      </div>
                      <h3 className={`text-2xl font-bold ${collection.textColor} mb-2`}>
                        {collection.name}
                      </h3>
                      <p className={`text-sm ${collection.textColor} opacity-90 mb-3 line-clamp-2`}>
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-semibold ${collection.textColor}`}>
                          {collection.price}
                        </span>
                        <ArrowRight className={`h-5 w-5 ${collection.textColor} group-hover:translate-x-2 transition-transform duration-300`} />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Selected Collection Products */}
          {selectedCollection && (
            <div className="mb-20">
              {(() => {
                const collection = collections.find(c => c.id === selectedCollection);
                const collectionProducts = getCollectionProducts(collection?.category || '');
                
                return (
                  <div className="animate-scale-in">
                    <div className="text-center mb-12">
                      <h3 className="text-3xl font-bold text-primary-purple mb-4">
                        {collection?.name}
                      </h3>
                      <p className="text-lg text-medium-purple max-w-2xl mx-auto mb-6">
                        {collection?.description}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCollection(null)}
                        className="border-mauve-purple text-mauve-purple hover:bg-mauve-purple hover:text-white"
                      >
                        View All Collections
                      </Button>
                    </div>
                    
                    {collectionProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {collectionProducts.map((product, index) => (
                          <div
                            key={product.id}
                            className="animate-scale-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-medium-purple text-lg">No products available in this collection yet.</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Featured Products */}
          {!selectedCollection && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-primary-purple mb-4">Featured Products</h3>
                <p className="text-lg text-medium-purple max-w-2xl mx-auto">
                  Discover our most popular candles, carefully selected from across all our collections.
                </p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                      <div className="w-full h-64 bg-gradient-to-br from-soft-pink to-light-mauve"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-5 bg-gradient-to-r from-light-mauve to-soft-pink rounded"></div>
                        <div className="h-3 bg-gradient-to-r from-soft-pink to-light-mauve rounded w-2/3"></div>
                        <div className="h-6 bg-gradient-to-r from-mauve-purple to-medium-purple rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredProducts.map((product, index) => (
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
            </div>
          )}
        </div>
      </section>

      {/* Collection Benefits */}
      <section className="py-16 bg-gradient-to-r from-soft-pink to-pale-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary-purple mb-4">Why Choose Our Collections?</h3>
            <p className="text-lg text-medium-purple max-w-2xl mx-auto">
              Every collection is thoughtfully designed to offer a complete sensory experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-primary-purple mb-2">Expertly Curated</h4>
              <p className="text-medium-purple">Each collection is carefully assembled by our fragrance experts to ensure perfect harmony.</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-mauve rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-primary-purple mb-2">Perfect for Gifting</h4>
              <p className="text-medium-purple">Beautifully packaged collections make memorable gifts for any occasion or celebration.</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-pink rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-primary-purple" />
              </div>
              <h4 className="text-lg font-semibold text-primary-purple mb-2">Emotional Connection</h4>
              <p className="text-medium-purple">Create lasting memories and emotional connections through our thoughtfully crafted scent stories.</p>
            </div>
          </div>
        </div>
      </section>

      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
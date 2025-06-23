import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export type Product = {
  id: string;
  name: string;
  description?: string;
  isScented: boolean;
  waxType: "soy" | "beeswax" | "coconut";
  category: "luxury" | "seasonal" | "gift-set" | "travel" | "wellness";
  price: number;
  imageUrl?: string;
  inStock: boolean;
};

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWaxType, setSelectedWaxType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { cartOpen, setCartOpen } = useCartStore();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesWaxType = selectedWaxType === "all" || product.waxType.toLowerCase().includes(selectedWaxType.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = product.price;
      switch (priceRange) {
        case "under-25":
          matchesPrice = price < 25;
          break;
        case "25-50":
          matchesPrice = price >= 25 && price <= 50;
          break;
        case "over-50":
          matchesPrice = price > 50;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesWaxType && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "luxury", label: "Luxury" },
    { value: "seasonal", label: "Seasonal" },
    { value: "wellness", label: "Wellness" },
    { value: "fresh", label: "Fresh" },
    { value: "comfort", label: "Comfort" },
    { value: "nature", label: "Nature" },
    { value: "romance", label: "Romance" },
    { value: "classic", label: "Classic" },
  ];

  const waxTypes = [
    { value: "all", label: "All Wax Types" },
    { value: "soy", label: "Soy Wax" },
    { value: "beeswax", label: "Beeswax" },
    { value: "coconut", label: "Coconut Wax" },
    { value: "paraffin", label: "Paraffin Wax" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-pink via-white to-soft-pink">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-purple via-medium-purple to-mauve-purple py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
            Discover Our <span className="text-gradient animate-flicker">Premium Candles</span>
          </h1>
          <p className="text-xl text-pale-pink mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated collection of handcrafted candles, each designed to transform your space into a sanctuary of warmth and tranquility.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-soft-pink text-primary-purple px-4 py-2 text-sm font-semibold">
              {products.length} Products Available
            </Badge>
            <Badge className="bg-light-mauve text-white px-4 py-2 text-sm font-semibold">
              Free Shipping Over $50
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-light-mauve/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Input
                type="text"
                placeholder="Search candles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-light-mauve focus:ring-mauve-purple focus:border-mauve-purple"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mauve-purple h-5 w-5" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 border-light-mauve">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedWaxType} onValueChange={setSelectedWaxType}>
                <SelectTrigger className="w-40 border-light-mauve">
                  <SelectValue placeholder="Wax Type" />
                </SelectTrigger>
                <SelectContent>
                  {waxTypes.map((waxType) => (
                    <SelectItem key={waxType.value} value={waxType.value}>
                      {waxType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 border-light-mauve">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-25">Under $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="over-50">Over $50</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-light-mauve">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-pale-pink rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-mauve-purple text-white" : "text-medium-purple"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-mauve-purple text-white" : "text-medium-purple"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || selectedWaxType !== "all" || priceRange !== "all" || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-medium-purple font-medium">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-light-mauve text-white">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="ml-2 hover:text-primary-purple">×</button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-light-mauve text-white">
                  {categories.find(c => c.value === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory("all")} className="ml-2 hover:text-primary-purple">×</button>
                </Badge>
              )}
              {selectedWaxType !== "all" && (
                <Badge variant="secondary" className="bg-light-mauve text-white">
                  {waxTypes.find(w => w.value === selectedWaxType)?.label}
                  <button onClick={() => setSelectedWaxType("all")} className="ml-2 hover:text-primary-purple">×</button>
                </Badge>
              )}
              {priceRange !== "all" && (
                <Badge variant="secondary" className="bg-light-mauve text-white">
                  {priceRange === "under-25" ? "Under $25" : priceRange === "25-50" ? "$25-$50" : "Over $50"}
                  <button onClick={() => setPriceRange("all")} className="ml-2 hover:text-primary-purple">×</button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedWaxType("all");
                  setPriceRange("all");
                }}
                className="text-medium-purple hover:text-primary-purple"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary-purple mb-2">Our Collection</h2>
              <p className="text-medium-purple">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {Array.from({ length: 12 }).map((_, i) => (
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
          ) : sortedProducts.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {sortedProducts.map((product, index) => (
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
            <div className="text-center py-16">
              <div className="relative mb-6">
                <Search className="h-16 w-16 text-mauve-purple mx-auto animate-float" />
                <div className="absolute inset-0">
                  <Search className="h-16 w-16 text-light-mauve mx-auto opacity-50 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-purple mb-2">No products found</h3>
              <p className="text-medium-purple mb-6">Try adjusting your filters or search terms.</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedWaxType("all");
                  setPriceRange("all");
                }}
                className="bg-gradient-mauve hover:bg-gradient-purple text-white"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
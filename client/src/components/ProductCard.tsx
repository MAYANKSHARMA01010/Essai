import { ReactNode, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export type Product = {
  id: string;
  name: string;
  description?: string; // <-- Make this optional
  isScented: boolean;
  waxType: "soy" | "beeswax" | "coconut";
  category: "luxury" | "seasonal" | "gift-set" | "travel" | "wellness";
  price: number;
  imageUrl?: string;
  inStock: boolean;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || "",
      quantity: 1,
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "luxury": return "bg-purple-100 text-purple-800 border-purple-200";
      case "seasonal": return "bg-orange-100 text-orange-800 border-orange-200";
      case "gift-set": return "bg-pink-100 text-pink-800 border-pink-200";
      case "travel": return "bg-blue-100 text-blue-800 border-blue-200";
      case "wellness": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getBurnTime = () => {
    if (product.category === "travel") return "15 hours";
    if (product.category === "luxury") return "80 hours";
    if (product.category === "gift-set") return "Multiple";
    return "60 hours";
  };

  return (
    <Card className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover-lift animate-scale-in">
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-64 bg-gradient-to-br from-soft-cream to-warm-cream animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-glow rounded-full animate-float"></div>
          </div>
        )}
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
          alt={product.name}
          className={`w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-flame-red text-flame-red animate-pulse' : 'text-warm-gray hover:text-flame-red'}`}
          />
        </button>

        {/* Category badge */}
        {product.category && (
          <div className="absolute top-4 left-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            <Badge className={`text-xs font-semibold backdrop-blur-sm ${getCategoryColor(product.category)} shadow-sm`}>
              {product.category === "gift-set" ? "Gift Set" : 
               product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
          </div>
        )}

        {/* Premium badge for luxury items */}
        {product.category === "luxury" && !isWishlisted && (
          <div className="absolute top-4 right-4 opacity-90 group-hover:opacity-0 transition-opacity duration-300">
            <Badge className="bg-gradient-flame text-white text-xs font-bold shadow-lg animate-glow-pulse">
              Premium
            </Badge>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-red-600 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-warm-amber transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center ml-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 text-yellow-400 fill-current" 
              />
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant="outline" className="text-xs border-warm-amber text-warm-amber">
            {product.waxType} wax
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.isScented ? "Scented" : "Unscented"}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {getBurnTime()} burn
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-warm-amber">
              ${product.price}
            </span>
            {product.category === "gift-set" && (
              <span className="text-xs text-gray-500 line-through">
                ${(product.price * 1.3).toFixed(2)}
              </span>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-gradient-warm hover:bg-gradient-glow text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg hover:shadow-xl group-hover:animate-pulse-glow"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
            Add to Cart
          </Button>
        </div>

        {/* Quick info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Free shipping over $50</span>
            <span>Handcrafted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

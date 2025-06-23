import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CheckoutModal from "./CheckoutModal";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Cart({ open, onOpenChange }: CartProps) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const total = getCartTotal();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setCheckoutOpen(true);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="relative mb-6">
                  <ShoppingCart className="h-16 w-16 text-warm-amber mx-auto animate-float" />
                  <div className="absolute inset-0">
                    <ShoppingCart className="h-16 w-16 text-amber-glow mx-auto opacity-50 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-warm-gray">Add some beautiful candles to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 p-4 bg-warm-white rounded-xl shadow-sm border border-light-amber/20 hover:shadow-md transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative group">
                      <img
                        src={item.imageUrl || "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 hover:text-warm-amber transition-colors cursor-pointer">{item.name}</h4>
                      <p className="text-sm text-warm-gray">
                        ${item.price.toFixed(2)} each
                      </p>
                      <p className="text-xs text-warm-amber font-medium">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg p-1 shadow-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="h-8 w-8 p-0 hover:bg-warm-amber hover:text-white transition-all duration-200"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-warm-amber hover:text-white transition-all duration-200"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-light-amber/30 pt-6 bg-gradient-to-b from-transparent to-soft-cream/50 rounded-b-lg">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-warm-gray">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-warm-gray">
                  <span>Shipping</span>
                  <span className="font-medium">{total >= 50 ? 'FREE' : '$5.99'}</span>
                </div>
                <div className="flex justify-between text-sm text-warm-gray">
                  <span>Tax (8%)</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>
                {total < 50 && (
                  <div className="text-xs text-warm-amber bg-amber-glow/10 p-2 rounded-lg">
                    Add ${(50 - total).toFixed(2)} more for free shipping!
                  </div>
                )}
                <Separator className="bg-light-amber/30" />
                <div className="flex justify-between font-bold text-xl">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gradient-warm">
                    ${(total + (total >= 50 ? 0 : 5.99) + total * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-warm hover:bg-gradient-glow text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
    </>
  );
}

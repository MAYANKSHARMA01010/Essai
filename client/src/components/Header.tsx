import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Flame, Search, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import Navbar from "./navbar";

export default function Header() {
  const { user, isLoading } = useAuth();
  const { cartItems, setCartOpen, setAuthenticated, isSyncing } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sync cart authentication state
  useEffect(() => {
    setAuthenticated(!!user);
  }, [user, setAuthenticated]);

  // Pulse cart when items are added
  useEffect(() => {
    if (totalItems > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleUserAction = () => {
    if (user) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/api/login";
    }
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-brand-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <div className="relative">
                <Flame className="text-brand-primary text-2xl mr-2 group-hover:animate-flicker transition-all duration-300" />
                <div className="absolute inset-0 group-hover:animate-glow-pulse">
                  <Flame className="text-brand-accent text-2xl mr-2 opacity-50" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gradient-brand group-hover:scale-105 transition-transform duration-300">WaxHeave</h1>
            </div>
          </Link>

          {/* Navigation */}
          <Navbar />

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-brand-primary/10 transition-colors duration-200">
              <Search className="h-4 w-4 text-brand-neutral hover:text-brand-primary transition-colors" />
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleUserAction}
                  className="hover:bg-brand-primary/10 transition-all duration-200"
                >
                  <User className="h-4 w-4 mr-1 text-brand-primary" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleUserAction}
                className="hover:bg-brand-primary/10 transition-all duration-200"
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-1" />
                {isLoading ? "Loading..." : "Login"}
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`relative hover:bg-brand-primary/10 transition-all duration-300 ${cartPulse ? 'animate-pulse-glow' : ''}`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className={`h-4 w-4 ${totalItems > 0 ? 'text-brand-primary' : 'text-brand-neutral'} transition-colors`} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in shadow-lg">
                  {totalItems}
                </span>
              )}
              {isSyncing && (
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden hover:bg-brand-primary/10 transition-colors"
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
            <Link href="/" className="block py-2 text-gray-700 hover:text-brand-primary">
              Home
            </Link>
            <Link href="/shop" className="block py-2 text-gray-700 hover:text-brand-primary">
              Shop
            </Link>
            <Link href="/collection" className="block py-2 text-gray-700 hover:text-brand-primary">
              Collections
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-brand-primary">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-brand-primary">
              Contact
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-brand-primary">
              Blog
            </Link>
            <Link href="/faq" className="block py-2 text-gray-700 hover:text-brand-primary">
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from './queryClient';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  cartOpen: boolean;
  isAuthenticated: boolean;
  isSyncing: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  setCartOpen: (open: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  syncWithServer: () => Promise<void>;
  loadFromServer: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartOpen: false,
      isAuthenticated: false,
      isSyncing: false,
      
      addToCart: async (item) => {
        const state = get();
        const existingItem = state.cartItems.find(i => i.id === item.id);
        
        let newItems;
        if (existingItem) {
          newItems = state.cartItems.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          newItems = [...state.cartItems, item];
        }
        
        set({ cartItems: newItems });
        
        // Sync with server if authenticated
        if (state.isAuthenticated) {
          try {
            await apiRequest("POST", "/api/cart", {
              productId: item.id,
              quantity: existingItem ? existingItem.quantity + item.quantity : item.quantity,
            });
          } catch (error) {
            console.warn("Failed to sync cart with server:", error);
          }
        }
      },
      
      removeFromCart: async (id) => {
        const state = get();
        const newItems = state.cartItems.filter(item => item.id !== id);
        set({ cartItems: newItems });
        
        if (state.isAuthenticated) {
          try {
            await apiRequest("DELETE", `/api/cart/${id}`);
          } catch (error) {
            console.warn("Failed to remove item from server cart:", error);
          }
        }
      },
      
      updateQuantity: async (id, quantity) => {
        const state = get();
        if (quantity <= 0) {
          await state.removeFromCart(id);
          return;
        }
        
        const newItems = state.cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ cartItems: newItems });
        
        if (state.isAuthenticated) {
          try {
            await apiRequest("PUT", `/api/cart/${id}`, { quantity });
          } catch (error) {
            console.warn("Failed to update cart quantity on server:", error);
          }
        }
      },
      
      clearCart: async () => {
        const state = get();
        set({ cartItems: [] });
        
        if (state.isAuthenticated) {
          try {
            await apiRequest("DELETE", "/api/cart");
          } catch (error) {
            console.warn("Failed to clear server cart:", error);
          }
        }
      },
      
      getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      setCartOpen: (open) => {
        set({ cartOpen: open });
      },
      
      setAuthenticated: (authenticated) => {
        const wasAuthenticated = get().isAuthenticated;
        set({ isAuthenticated: authenticated });
        
        // Load from server when user logs in
        if (authenticated && !wasAuthenticated) {
          get().loadFromServer();
        }
      },
      
      syncWithServer: async () => {
        const state = get();
        if (!state.isAuthenticated || state.isSyncing) return;
        
        set({ isSyncing: true });
        try {
          // Send local cart to server
          for (const item of state.cartItems) {
            await apiRequest("POST", "/api/cart", {
              productId: item.id,
              quantity: item.quantity,
            });
          }
        } catch (error) {
          console.warn("Failed to sync cart with server:", error);
        } finally {
          set({ isSyncing: false });
        }
      },
      
      loadFromServer: async () => {
        const state = get();
        if (!state.isAuthenticated || state.isSyncing) return;
        
        set({ isSyncing: true });
        try {
          const response = await apiRequest("GET", "/api/cart");
          const serverCartItems = await response.json();
          
          // Convert server cart items to client format
          const cartItems: CartItem[] = serverCartItems.map((item: any) => ({
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            imageUrl: item.product.imageUrl || "",
            quantity: item.quantity,
          }));
          
          // Merge with local cart (prioritize server data)
          const localItems = state.cartItems;
          const mergedItems = [...cartItems];
          
          // Add local items that aren't on server
          for (const localItem of localItems) {
            if (!cartItems.find((item: CartItem) => item.id === localItem.id)) {
              mergedItems.push(localItem);
              // Also add to server
              await apiRequest("POST", "/api/cart", {
                productId: localItem.id,
                quantity: localItem.quantity,
              });
            }
          }
          
          set({ cartItems: mergedItems });
        } catch (error) {
          console.warn("Failed to load cart from server:", error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'waxheave-cart',
      partialize: (state) => ({ 
        cartItems: state.cartItems 
      }),
    }
  )
);

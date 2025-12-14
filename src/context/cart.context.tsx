import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCart,
  setCart,
  clearCart as clearCartStorage,
} from "src/utils/cartStorage";

// ----------------------------------
// Types
// ----------------------------------
export type CartItem = {
  designId: string;
  name: string;
  previewImage: string | null;
  price: number;          // ✅ added (required for totals)
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];

  addOrIncrease: (
    item: Omit<CartItem, "quantity">,
    quantity?: number
  ) => void;

  decreaseQuantity: (designId: string) => void;
  updateQuantity: (designId: string, quantity: number) => void;

  removeFromCart: (designId: string) => void;
  clearCart: () => void;

  getCartTotal: () => number;
  getItemTotal: (designId: string) => number;
  getCartCount: () => number;
};

// ----------------------------------
// Context
// ----------------------------------
const CartContext = createContext<CartContextType | undefined>(undefined);

// ----------------------------------
// Provider
// ----------------------------------
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    () => getCart() || []
  );

  // Persist cart
  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  // ----------------------------------
  // Actions
  // ----------------------------------
  const addOrIncrease = (
    item: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (i) => i.designId === item.designId
      );

      if (index !== -1) {
        return prev.map((i, idx) =>
          idx === index
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  const decreaseQuantity = (designId: string) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.designId === designId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const updateQuantity = (designId: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => i.designId !== designId);
      }

      return prev.map((i) =>
        i.designId === designId ? { ...i, quantity } : i
      );
    });
  };

  const removeFromCart = (designId: string) => {
    setCartItems((prev) =>
      prev.filter((i) => i.designId !== designId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    clearCartStorage();
  };

  // ----------------------------------
  // Calculations
  // ----------------------------------
  const getItemTotal = (designId: string) => {
    const item = cartItems.find(
      (i) => i.designId === designId
    );
    return item ? item.price * item.quantity : 0;
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
  };

  // ----------------------------------
  // Provider
  // ----------------------------------
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addOrIncrease,
        decreaseQuantity,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getItemTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ----------------------------------
// Hook
// ----------------------------------
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};

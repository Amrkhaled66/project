import React, { createContext, useContext, useEffect, useState } from "react";
import { BlanketSize, BLANKET_SIZES } from "src/data/blanketSizes";

type Upgrade = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  size: BlanketSize;
  color: string | null;
  borderColor: string | null;
  upgrades: Upgrade[];
  quantity: number;
  totalPrice: number;
  designImage: string | null;
};

type CartContextType = {
  cartItem: CartItem;
  updateSize: (size: BlanketSize) => void;
  updateColor: (color: string | null) => void;
  updateBorderColor: (borderColor: string | null) => void;
  updateUpgrades: (upgrades: Upgrade[]) => void;
  updateQuantity: (quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateDesign: (designImage: string | null) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const initialState: CartItem = {
  size: BLANKET_SIZES[0],
  color: null,
  borderColor: null,
  upgrades: [],
  quantity: 1,
  totalPrice: 0,
  designImage: null,
};
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItem, setCartItem] = useState<CartItem>(() => {
    const saved = localStorage.getItem("blanketCart");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return initialState;
    }
  });

  // --- Save to localStorage ---
  useEffect(() => {
    if (cartItem) {
      localStorage.setItem("blanketCart", JSON.stringify(cartItem));
    } else {
      localStorage.removeItem("blanketCart");
    }
  }, [cartItem]);

  // --- Helper: calculate total price ---
  const calculateTotalPrice = (
    size: BlanketSize,
    upgrades: Upgrade[],
    quantity: number,
  ) => {
    const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
    return (size.price + upgradesTotal) * quantity;
  };

  // --- Update size ---
  const updateSize = (size: BlanketSize) => {
    setCartItem((prev) => {
      return {
        ...prev,
        size,
        totalPrice: calculateTotalPrice(size, prev.upgrades, prev.quantity),
      };
    });
  };

  // --- Update blanket color ---
  const updateColor = (color: string | null) => {
    setCartItem((prev) => {
      return { ...prev, color };
    });
  };

  // --- Update border color ---
  const updateBorderColor = (borderColor: string | null) => {
    setCartItem((prev) => {
      return { ...prev, borderColor };
    });
  };

  // --- Update upgrades ---
  const updateUpgrades = (upgrades: Upgrade[]) => {
    setCartItem((prev) => {
      return {
        ...prev,
        upgrades,
        totalPrice: calculateTotalPrice(prev.size, upgrades, prev.quantity),
      };
    });
  };

  // --- Update quantity ---
  const updateQuantity = (quantity: number) => {
    setCartItem((prev) => {
      return {
        ...prev,
        quantity,
        totalPrice: calculateTotalPrice(prev.size, prev.upgrades, quantity),
      };
    });
  };

  const updateDesign = (designImage: string | null) => {
    setCartItem((prev) => {
      return { ...prev, designImage };
    });
  };

  // --- Clear ---
  const clearCart = () => setCartItem(initialState);

  // --- Get total ---
  const getCartTotal = () => (cartItem ? cartItem.totalPrice : 0);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        updateSize,
        updateColor,
        updateBorderColor,
        updateUpgrades,
        updateQuantity,
        clearCart,
        getCartTotal,
        updateDesign
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

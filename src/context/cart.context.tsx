import React, { createContext, useContext, useEffect, useState } from "react";
import { BlanketSize, BLANKET_SIZES } from "src/data/blanketSizes";
import { upgrades } from "src/data/upgrades";
import {
  getCart,
  setCart,
  clearCart as clearCartStorage,
} from "src/utils/cartStorage";
type Upgrade = {
  id: string;
  name: string;
  price: number;
  props?: {
    [key: string]: any;
  };
};

export type CartItem = {
  size: BlanketSize;
  color: string | null;
  borderColor: string | null;
  upgrades: Upgrade[];
  quantity: number;
  totalPrice: number;
  designImage: string | null;
  backingColor: string | null;
  cornerImage: string | null;
};

type CartContextType = {
  cartItem: CartItem;
  updateSize: (size: BlanketSize) => void;
  updateColor: (color: string | null) => void;
  updateBorderColor: (borderColor: string | null) => void;
  updateBackingColor: (color: string | null) => void;
  updateUpgrades: (upgrades: Upgrade[]) => void;
  updateQuantity: (quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateDesign: (designImage: string | null) => void;
  updateBindingColor: (color: string | null) => void;
  updateBlockingColor: (color: string[], random: boolean) => void;
  updateCornerImage: (image: string | null) => void;
  updateEmbroidery: (zones: any) => void;
  hasFringe: boolean;
  hasBlocking: boolean;
  hasBinding: boolean;
  hasEmbroidery: boolean;
  isQualityPreserve: boolean;
  isCornerstones: boolean;
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
  backingColor: null,
  cornerImage: null,
};
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItem, setCartItem] = useState<CartItem>(() => {
    const saved = getCart();
    if (saved) {
      return saved;
    } else {
      return initialState;
    }
  });

  // --- Save to localStorage ---
  useEffect(() => {
    if (cartItem) {
      setCart(cartItem);
    } else {
      clearCartStorage();
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
  const updateBackingColor = (color: string | null) => {
    setCartItem((prev) => {
      return { ...prev, backingColor: color };
    });
  };

  // --- Update border color ---
  const updateBorderColor = (borderColor: string | null) => {
    setCartItem((prev) => {
      return { ...prev, borderColor };
    });
  };

  const updateCornerImage = (cornerImage: string | null) => {
    setCartItem((prev) => {
      return { ...prev, cornerImage };
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

  const updateBindingColor = (color: string | null) => {
    setCartItem((prev) => {
      const hasBinding = prev.upgrades.some((u) => u.id === "binding");
      if (!hasBinding) return prev;
      return {
        ...prev,
        upgrades: prev.upgrades.map((u) =>
          u.id === "binding" ? { ...u, props: { ...u.props, color } } : u,
        ),
      };
    });
  };

  const updateDesign = (designImage: string | null) => {
    setCartItem((prev) => {
      return { ...prev, designImage };
    });
  };

  const updateBlockingColor = (color: string[], random: boolean) => {
    setCartItem((prev) => {
      const hasBlocking = prev.upgrades.some((u) => u.id === "blocking");
      if (!hasBlocking) return prev;
      return {
        ...prev,
        upgrades: prev.upgrades.map((u) =>
          u.id === "blocking"
            ? { ...u, props: { ...u.props, color, random } }
            : u,
        ),
      };
    });
  };

  const updateEmbroidery = (zones:any) => {
    setCartItem((prev) => {
      const hasEmbroidery = prev.upgrades.some((u) => u.id === "embroidery");
      if (!hasEmbroidery) return prev;
      return {
        ...prev,
        upgrades: prev.upgrades.map((u) =>
          u.id === "embroidery" ? { ...u, props: { ...u.props, zones } } : u,
        ),
      };
    });
  };

  // --- Clear ---
  const clearCart = () => {
    setCartItem(initialState);
    clearCartStorage();
  };

  // --- Get total ---
  const getCartTotal = () => (cartItem ? cartItem.totalPrice : 0);
  const hasFringe = cartItem.upgrades?.some((u) => u.id === "fringeBorder");
  const hasBinding = cartItem.upgrades?.some((u) => u.id === "binding");
  const isQualityPreserve = cartItem.upgrades?.some(
    (u) => u.id === "quiltedPreserve",
  );
  const isCornerstones = cartItem?.upgrades?.some(
    (u) => u.id === "cornerstonesSingle" || u.id === "cornerstonesDouble",
  );
  const hasBlocking = cartItem?.upgrades?.some((u) => u.id === "blocking");
  const hasEmbroidery = cartItem?.upgrades?.some((u) => u.id === "embroidery");
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
        updateDesign,
        updateBackingColor,
        updateBindingColor,
        updateCornerImage,
        updateBlockingColor,
        updateEmbroidery,
        hasFringe,
        hasBlocking,
        hasBinding,
        isQualityPreserve,
        isCornerstones,
        hasEmbroidery,
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

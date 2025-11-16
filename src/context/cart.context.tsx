import React, { createContext, useContext, useEffect, useState } from "react";
import { BlanketSize, BLANKET_SIZES } from "src/data/blanketSizes";
import {
  getCart,
  setCart,
  clearCart as clearCartStorage,
} from "src/utils/cartStorage";
import { upgrades } from "src/data/upgrades";

type Upgrade = {
  id: string;
  name: string;
  price: number;
  props?: Record<string, any>;
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
  updateUpgrades: (id: string) => void;
  updateQuantity: (quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateDesign: (designImage: string | null) => void;
  updateBindingColor: (color: string | null) => void;
  updateBlockingColor: (color: string[], random: boolean) => void;
  updateCornerImage: (index: number, image: string) => void;
  updateEmbroidery: (zones: any) => void;
  updateQualityPreservedColor: (color: string) => void;
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

const calculateTotalPrice = (
  size: BlanketSize,
  upgrades: Upgrade[],
  quantity: number
): number => {
  const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
  return (size.price + upgradesTotal) * quantity;
};

const handleUpgradeRemoval = (currentIds: string[], id: string): string[] => {
  let newIds = currentIds.filter((u) => u !== id);

  // Remove binding if quiltedPreserve removed
  if (id === "quiltedPreserve") {
    newIds = newIds.filter((u) => u !== "binding");
  }

  return newIds;
};

const handleUpgradeAddition = (currentIds: string[], id: string): string[] => {
  let newIds = [...currentIds, id];

  // quiltedPreserve adds binding automatically
  if (id === "quiltedPreserve" && !newIds.includes("binding")) {
    newIds.push("binding");
  }

  // cornerstones double removes single
  if (id === "cornerstonesDouble") {
    newIds = newIds.filter((u) => u !== "cornerstonesSingle");
  }

  // cornerstones single removes double
  if (id === "cornerstonesSingle") {
    newIds = newIds.filter((u) => u !== "cornerstonesDouble");
  }

  return newIds;
};

const mapUpgrades = (
  upgradeIds: string[],
  existingUpgrades: Upgrade[]
): Upgrade[] => {
  return upgrades
    .filter((u) => upgradeIds.includes(u.id))
    .map((u) => {
      const existing = existingUpgrades.find((x) => x.id === u.id);
      return existing ? { ...u, props: existing.props } : u;
    });
};

const updateUpgradeProps = (
  upgrades: Upgrade[],
  upgradeId: string,
  newProps: Record<string, any>
): Upgrade[] => {
  return upgrades.map((u) =>
    u.id === upgradeId ? { ...u, props: { ...u.props, ...newProps } } : u
  );
};

const hasUpgrade = (upgrades: Upgrade[], id: string): boolean => {
  return upgrades.some((u) => u.id === id);
};

// Generic updater for simple cart properties
const createSimpleUpdater = <K extends keyof CartItem>(
  setCartItem: React.Dispatch<React.SetStateAction<CartItem>>,
  key: K
) => {
  return (value: CartItem[K]) => {
    setCartItem((prev) => ({ ...prev, [key]: value }));
  };
};

// Generic updater for upgrade properties with validation
const createUpgradePropsUpdater = (
  setCartItem: React.Dispatch<React.SetStateAction<CartItem>>,
  upgradeId: string
) => {
  return (props: Record<string, any>) => {
    setCartItem((prev) => {
      if (!hasUpgrade(prev.upgrades, upgradeId)) return prev;
      return {
        ...prev,
        upgrades: updateUpgradeProps(prev.upgrades, upgradeId, props),
      };
    });
  };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItem, setCartItem] = useState<CartItem>(() => {
    return getCart() || initialState;
  });

  // Persist to localStorage
  useEffect(() => {
    if (cartItem) {
      setCart(cartItem);
    } else {
      clearCartStorage();
    }
  }, [cartItem]);

  // Simple property updaters
  const updateColor = createSimpleUpdater(setCartItem, "color");
  const updateBackingColor = createSimpleUpdater(setCartItem, "backingColor");
  const updateBorderColor = createSimpleUpdater(setCartItem, "borderColor");
  const updateDesign = createSimpleUpdater(setCartItem, "designImage");

  // Upgrade property updaters
  const updateBindingColor = (color: string | null) => {
    createUpgradePropsUpdater(setCartItem, "binding")({ color });
  };

  const updateBlockingColor = (color: string[], random: boolean) => {
    createUpgradePropsUpdater(setCartItem, "blocking")({ color, random });
  };

  const updateQualityPreservedColor = (color: string) => {
    createUpgradePropsUpdater(setCartItem, "quiltedPreserve")({ color });
  };

  const updateEmbroidery = (zones: any) => {
    createUpgradePropsUpdater(setCartItem, "embroidery")({ zones });
  };

  // Complex updaters
  const updateSize = (size: BlanketSize) => {
    setCartItem((prev) => ({
      ...prev,
      size,
      totalPrice: calculateTotalPrice(size, prev.upgrades, prev.quantity),
    }));
  };

  const updateUpgrades = (id: string) => {
    setCartItem((prev) => {
      const currentIds = prev.upgrades.map((u) => u.id);
      const isSelected = currentIds.includes(id);

      const newIds = isSelected
        ? handleUpgradeRemoval(currentIds, id)
        : handleUpgradeAddition(currentIds, id);

      const finalUpgrades = mapUpgrades(newIds, prev.upgrades);

      return {
        ...prev,
        upgrades: finalUpgrades,
        totalPrice: calculateTotalPrice(prev.size, finalUpgrades, prev.quantity),
      };
    });
  };

  const updateQuantity = (quantity: number) => {
    setCartItem((prev) => ({
      ...prev,
      quantity,
      totalPrice: calculateTotalPrice(prev.size, prev.upgrades, quantity),
    }));
  };

  const updateCornerImage = (index: number, image: string) => {
    setCartItem((prev) => ({
      ...prev,
      upgrades: prev.upgrades.map((u) => {
        if (u.id === "cornerstonesSingle" || u.id === "cornerstonesDouble") {
          return {
            ...u,
            props: {
              ...u.props,
              cornerImages: {
                ...(u.props?.cornerImages || {}),
                [index]: image,
              },
            },
          };
        }
        return u;
      }),
    }));
  };

  const clearCart = () => {
    setCartItem(initialState);
    clearCartStorage();
  };

  const getCartTotal = () => cartItem.totalPrice;

  // Computed flags
  const hasFringe = hasUpgrade(cartItem.upgrades, "fringeBorder");
  const hasBindingFlag = hasUpgrade(cartItem.upgrades, "binding");
  const isQualityPreserve = hasUpgrade(cartItem.upgrades, "quiltedPreserve");
  const isCornerstones = hasUpgrade(cartItem.upgrades, "cornerstonesSingle") || 
                         hasUpgrade(cartItem.upgrades, "cornerstonesDouble");
  const hasBlockingFlag = hasUpgrade(cartItem.upgrades, "blocking");
  const hasEmbroideryFlag = hasUpgrade(cartItem.upgrades, "embroidery");

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
        hasBlocking: hasBlockingFlag,
        hasBinding: hasBindingFlag,
        isQualityPreserve,
        isCornerstones,
        hasEmbroidery: hasEmbroideryFlag,
        updateQualityPreservedColor,
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
import { createContext, useContext, useMemo } from "react";
import { useCart } from "./cart.context";

const CartFlagsContext = createContext<any>(null);

export const CartFlagsProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartItem } = useCart();

  const flags = useMemo(() => {
    const upgrades = cartItem.upgrades;
    const has = (id: string) => upgrades.some((u) => u.id === id);

    return {
      hasFringe: has("fringeBorder"),
      hasBinding: has("binding"),
      isQualityPreserve: has("quiltedPreserve"),
      hasBlocking: has("blocking"),
      hasEmbroidery: has("embroidery"),
      isCornerstones: has("cornerstonesSingle") || has("cornerstonesDouble"),
    };
  }, [cartItem.upgrades]);

  return (
    <CartFlagsContext.Provider value={flags}>
      {children}
    </CartFlagsContext.Provider>
  );
};

export const useCartFlags = () => useContext(CartFlagsContext);

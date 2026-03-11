import { useMemo } from "react";
import priceFormatter from "src/utils/priceFormmater";
import { useCart } from "src/context/cart.context";
import { useStates } from "src/hooks/queries/staticData.queries";
import { useDesign } from "src/context/desgin.context";
import { BLANKET_SIZES } from "src/data/blanketSizes";
type Props = {
  state: string; // state code (e.g. "CA", "NY")
};

const CartSummary = () => {
  const { cartItems, cartTotal } = useCart();

  /* ---------------- SHIPPING FEE ---------------- */
  // const shippingFee = useMemo(() => {
  //   if (!state || cartItems.length === 0 || isLoading) return 0;

  //   const selectedState = states.find(
  //     (s: { name: string; shippingFee: number }) => s.name === state,
  //   );

  //   return selectedState?.shippingFee ?? 0;
  // }, [state, states, cartItems.length, isLoading]);

  const shippingFee = cartItems.reduce((total, item) => {
    total +=
      BLANKET_SIZES.find((s) => s.id === item.sizeId)?.shippingPrice || 0;
    return total;
  }, 0);

  /* ---------------- TOTAL ---------------- */
  const totalWithShipping = useMemo(() => {
    return cartTotal() + shippingFee;
  }, [cartTotal, shippingFee]);

  /* ---------------- UI ---------------- */
  return (
    <aside className="bg-mainProfile/10 rounded-lg border border-neutral-200 p-4 lg:sticky lg:top-6">
      <h2 className="mb-3 text-xl font-semibold">Commission Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Build Value</span>
          <span>{priceFormatter(cartTotal())}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{priceFormatter(shippingFee)}</span>
        </div>

        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Commission Value</span>
          <span>{priceFormatter(totalWithShipping)}</span>
        </div>
      </div>
    </aside>
  );
};

export default CartSummary;

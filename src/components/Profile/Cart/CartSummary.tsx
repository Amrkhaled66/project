import { useMemo } from "react";
import priceFormatter from "src/utils/priceFormmater";
import { useCart } from "src/context/cart.context";
import { useStates } from "src/hooks/queries/staticData.queries";

type Props = {
  state: string; // state code (e.g. "CA", "NY")
};

const CartSummary = ({ state }: Props) => {
  const { cartItems, cartTotal,  } = useCart();
  const { data: states = [], isLoading } = useStates();

  /* ---------------- SHIPPING FEE ---------------- */
  const shippingFee = useMemo(() => {
    if (!state || cartItems.length === 0 || isLoading) return 0;

    const selectedState = states.find(
      (s: { name: string; shippingFee: number }) => s.name === state,
    );

    return selectedState?.shippingFee ?? 0;
  }, [state, states, cartItems.length, isLoading]);

  /* ---------------- TOTAL ---------------- */
  const totalWithShipping = useMemo(() => {
    return cartTotal() + shippingFee;
  }, [cartTotal, shippingFee]);

  /* ---------------- UI ---------------- */
  return (
    <aside className="rounded-lg border border-neutral-200 bg-mainProfile/10 p-4 lg:sticky lg:top-6">
      <h2 className="mb-3 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{priceFormatter(cartTotal())}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{priceFormatter(shippingFee)}</span>
        </div>

        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Total</span>
          <span>{priceFormatter(totalWithShipping)}</span>
        </div>
      </div>
    </aside>
  );
};

export default CartSummary;

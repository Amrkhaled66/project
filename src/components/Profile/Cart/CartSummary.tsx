import { useMemo } from "react";
import priceFormatter from "src/utils/priceFormmater";
import { useCart } from "src/context/cart.context";

import { BLANKET_SIZES } from "src/data/blanketSizes";
import MainDashButton from "src/components/ui/MainDashButton";
const CartSummary = ({
  handleSubmit,
  isPending,
}: {
  handleSubmit: (e?: React.FormEvent) => void | Promise<void>;
  isPending: boolean;
}) => {
  const { cartItems, cartTotal } = useCart();

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
    <aside className="lg:sticky lg:top-6">
      <h2 className="font-header mb-3 text-xl font-semibold tracking-wider">
        Commission Summary
      </h2>

      <div className="rounded-3xl px-5 py-8 space-y-5 drop-shadow-sm bg-white">
        <div className="space-y-2 ">
          <div className="flex justify-between">
            <span className="text-subTitle">Build Value</span>
            <span className="font-semibold">{priceFormatter(cartTotal())}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-subTitle">Delivery</span>
            <span className="font-semibold">{priceFormatter(shippingFee)}</span>
          </div>

          <div className="border-t-subTitle/30 flex flex-col justify-between gap-y-3 border-t pt-6 font-semibold">
            <span className="text-subTitle/50 font-header text-xs tracking-wider uppercase">
              Total Commission Value
            </span>
            <span className="text-4xl font-semibold">
              {priceFormatter(totalWithShipping)}
            </span>
          </div>
        </div>
        <MainDashButton isLoading={isPending} disabled={isPending} onClick={handleSubmit} text="Commission Payment"/>
      </div>
    </aside>
  );
};

export default CartSummary;

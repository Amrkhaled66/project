import priceFormatter from "src/utils/priceFormmater";
import MainDashButton from "src/components/ui/MainDashButton";
import { CartItem as CartItemType } from "src/context/cart.context"; // adjust import path
import { useCart } from "src/context/cart.context";
type CartSummaryProps = {
  onCheckout?: () => void;
};

const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const { cartItem } = useCart();
  const { size, color, borderColor, quantity, totalPrice, upgrades } = cartItem;
  return (
    <aside className="bg-mainProfile/10 rounded-lg border border-neutral-200 p-4 sm:p-6 lg:sticky lg:top-6 lg:p-6">
      <h2 className="mb-3 text-xl font-semibold sm:text-2xl">Order Summary</h2>

      <div className="divide-y divide-neutral-200">
        {/* Items list */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex w-full items-center gap-x-3">
              <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 sm:h-20 sm:w-20">
                <img
                  className="h-full w-full object-cover"
                  src={cartItem.designImage||""}
                  alt={`${size.name} blanket`}
                />
              </div>

              <div className="flex w-full flex-col">
                <div className="flex w-full justify-between text-sm sm:text-base">
                  <p className="truncate pr-2 font-medium">
                    {size.name} Blanket
                  </p>
                  <p className="shrink-0">{priceFormatter(totalPrice)}</p>
                </div>

                {/* Color indicators */}
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>Blanket:</span>
                    <span
                      className="inline-block size-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: color || "#eee" }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Border:</span>
                    <span
                      className="inline-block size-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: borderColor || "#eee" }}
                    />
                  </div>
                </div>

                {/* Upgrades */}
                {upgrades?.length > 0 && (
                  <p className="mt-1 text-xs text-gray-600">
                    Upgrades: {upgrades.map((u) => u.name).join(", ")}
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-500">Qty: {quantity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary section */}
        <div className="space-y-2 py-4 text-sm sm:text-base">
          <p className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{priceFormatter(cartItem.totalPrice)}</span>
          </p>
          <p className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{priceFormatter(10)}</span>
          </p>
          <p className="flex items-center justify-between border-t border-neutral-200 pt-2 text-lg font-semibold">
            <span>Total</span>
            <span>{priceFormatter(cartItem.totalPrice)}</span>
          </p>
        </div>
      </div>

      {/* <div className="pt-4">
        <MainDashButton text="Place Order" onClick={onCheckout || (() => {})} />
      </div> */}
    </aside>
  );
};

export default CartSummary;

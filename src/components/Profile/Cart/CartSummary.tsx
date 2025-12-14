import priceFormatter from "src/utils/priceFormmater";
import MainDashButton from "src/components/ui/MainDashButton";
import { useCart } from "src/context/cart.context";

const SHIPPING_PRICE = 10;

const CartSummary = () => {
  const { cartItems, getCartTotal } = useCart();

  const cartTotal = getCartTotal();
  const total = cartTotal + (cartItems.length > 0 ? SHIPPING_PRICE : 0);

  return (
    <aside className="bg-mainProfile/10 rounded-lg border border-neutral-200 p-4 lg:sticky lg:top-6">
      <h2 className="mb-3 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>{priceFormatter(cartTotal)}</span>
        </p>

        <p className="flex justify-between">
          <span>Shipping</span>
          <span>
            {cartItems.length > 0
              ? priceFormatter(SHIPPING_PRICE)
              : priceFormatter(0)}
          </span>
        </p>

        <p className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Total</span>
          <span>{priceFormatter(total)}</span>
        </p>
      </div>

      <div className="pt-4">
        <MainDashButton text="Checkout" disabled={cartItems.length === 0} />
      </div>
    </aside>
  );
};

export default CartSummary;

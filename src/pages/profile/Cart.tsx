import cart from "src/data/cart";
import CartItem from "src/components/Profile/Cart/CartItem";
import CartSummary from "src/components/Profile/Cart/CartSummary";
import CartForm from "src/components/Profile/Cart/CartForm";
const Cart = () => {
  return (
    <div className="mx-auto space-y-5 px-4 sm:px-6 lg:space-y-10 lg:px-8">
      <div className="page-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">Your Cart Items</h1>
      </div>
      <div className="flex min-h-screen items-start justify-between gap-6 lg:gap-10">
        <div className="space-y-10 lg:w-1/2">
          <div className="space-y-2  ">
            {cart.items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <CartForm />
        </div>
        <CartSummary cart={cart} />
      </div>
    </div>
  );
};

export default Cart;

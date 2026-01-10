import CartItem from "src/components/Profile/Cart/CartItem";
import CartSummary from "src/components/Profile/Cart/CartSummary";
import CartForm from "src/components/Profile/Cart/CartForm";
import { useCart } from "src/context/cart.context";
import { useState } from "react";

const Cart = () => {
  const { cartItems } = useCart();
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    zip: "",
    notes: "",
  });
  return (
    <div className="mx-auto space-y-5 lg:space-y-10">
      <div className="page-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">Your Cart Items</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Items + form */}
        <div className="space-y-6 lg:col-span-8">
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.designId} item={item} />
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty</p>
            )}
          </div>

          <CartForm values={shippingData} setValues={setShippingData} />
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <CartSummary state={shippingData.state}  />
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import priceFormmater from "src/utils/priceFormmater";
import MainDashButton from "src/components/ui/MainDashButton";
const CartSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="bg-mainProfile sticky top-0 max-w-[40%] flex-1 space-y-4 rounded-lg px-5 py-6">
      <h2 className="text-2xl font-semibold">Order Summary</h2>
      <div className="border-b border-b-gray-400">
        {cart.items.map((item: any) => {
          const { id, name, price, quantity } = item;
          return (
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center gap-x-2">
                <div className="size-20 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src="/placeholder.png"
                    alt={name}
                  />
                </div>

                <div className="flex w-full flex-col">
                  <div className="flex w-full justify-between text-lg">
                    <p>{name}</p>
                    <p>{priceFormmater(price)}</p>
                  </div>
                  <p>
                    {quantity} X {priceFormmater(price)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-2 border-b border-b-gray-400 pb-4">
        <p className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{priceFormmater(cart.subTotal)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{priceFormmater(cart.shipping)}</span>
        </p>
      </div>

      <MainDashButton text="Place Order" />
    </div>
  );
};

export default CartSummary;

// src/components/Profile/Dashboard/CurrentDesignCard.tsx
import { useCart } from "src/context/cart";
import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import priceFormmater from "src/utils/priceFormmater";
import { initialState, CartItem } from "src/context/cart";
const isInitialCart = (item: CartItem, initial: CartItem): boolean => {
  return (
    item.size.id === initial.size.id &&
    item.color === initial.color &&
    item.borderColor === initial.borderColor &&
    item.quantity === initial.quantity &&
    item.totalPrice === initial.totalPrice &&
    item.designImage === initial.designImage &&
    item.upgrades.length === 0 // نكتفي بأن القائمة فاضية
  );
};

const CurrentDesignCard = () => {
  const { cartItem, getCartTotal } = useCart();

  if (isInitialCart(cartItem, initialState)) {
    return null;
  }

  return (
    <div className="animate flex w-full flex-col space-y-6 rounded-xl border-2 bg-white py-4 shadow-md hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4">
        <ImageIcon />
        <p className="text-xl font-semibold">Your Design In Progress</p>
      </div>

      {/* Main content: image + info */}
      <div className="flex flex-col gap-4 px-4 md:flex-row">
        {/* Design image */}
        <div className="flex-shrink-0">
          {cartItem.designImage ? (
            <img
              src={cartItem.designImage}
              alt="Design Preview"
              className="h-32 w-auto rounded-lg border object-contain"
            />
          ) : (
            <div className="flex h-32 w-40 items-center justify-center rounded-lg border bg-gray-100 text-center text-sm text-gray-400">
              No Design Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between gap-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>Size:</strong> {cartItem.size.name}
            </p>
            <p>
              <strong>Quantity:</strong> {cartItem.quantity}
            </p>
            <p className="flex items-center gap-1">
              <strong>Blanket Color:</strong>
              <div
                className="size-4 rounded-full border"
                style={{ backgroundColor: cartItem.color || "#ccc" }}
              />
            </p>
            <p className="flex items-center gap-1">
              <strong>Border:</strong>
              <div
                className="size-4 rounded-full border"
                style={{ backgroundColor: cartItem.borderColor || "#ccc" }}
              />
            </p>
          </div>

          {cartItem.upgrades.length > 0 && (
            <div>
              <p className="text-sm font-semibold">Upgrades:</p>
              <ul className="ml-4 list-disc text-sm text-gray-700">
                {cartItem.upgrades.map((up) => (
                  <li key={up.id}>
                    {up.name} (+{up.price} EGP)
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="pt-1 text-sm font-semibold">
            Total: <span>{priceFormmater(getCartTotal())}</span>
          </p>
        </div>
      </div>

      {/* Action button */}
      <Link
        to="/profile/desgin"
        className="mx-auto w-[90%] rounded-xl border border-black/70 bg-black py-3 text-center text-white transition hover:bg-white hover:text-black lg:w-[80%]"
      >
        Complete Your Design
      </Link>
    </div>
  );
};

export default CurrentDesignCard;

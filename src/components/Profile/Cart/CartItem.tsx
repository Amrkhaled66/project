import priceFormatter from "src/utils/priceFormmater";
import { CartItem as CartItemType } from "src/context/cart";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { size, color, borderColor, upgrades, quantity, totalPrice } = item;

  return (
    <div className="flex items-center justify-between border-b border-b-gray-300 pb-4">
      {/* Thumbnail */}
      <div className="flex w-full items-center gap-4">
        <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 sm:h-20 sm:w-20">
          <img
            className="h-full w-full object-cover"
            src={item.designImage || ""}
            alt={`${size.name} blanket`}
          />
        </div>

        {/* Item details */}
        <div className="flex w-full flex-col">
          <div className="flex items-start justify-between">
            <p className="text-lg font-semibold">{size.name} Blanket</p>
            <p className="font-medium text-gray-800">
              {priceFormatter(totalPrice)}
            </p>
          </div>

          {/* Colors */}
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>Blanket:</span>
              <span
                className="inline-block size-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color || "#eee" }}
              />
            </div>
            <div className="flex items-center gap-1">
              <span>Border:</span>
              <span
                className="inline-block size-4 rounded-full border border-gray-300"
                style={{ backgroundColor: borderColor || "#eee" }}
              />
            </div>
          </div>

          {/* Upgrades */}
          {upgrades?.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {upgrades.map((u) => (
                <span
                  key={u.id}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  {u.name}
                </span>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
            <p>Quantity: {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

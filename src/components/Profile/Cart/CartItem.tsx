import { motion } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";
import priceFormatter from "src/utils/priceFormmater";
import { CartItem as CartItemType, useCart } from "src/context/cart.context";
import Button from "src/components/ui/Button";
import getImageLink from "src/utils/getImageLink";

type CartItemProps = {
  item: CartItemType;
  canChangeQty?: boolean; // ✅ optional (default true)
};

const CartItem = ({ item }: CartItemProps) => {
  const {  removeFromCart } = useCart();

  const totalPrice = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group animate flex cursor-pointer items-center gap-4 rounded-3xl bg-white p-4 drop-shadow-sm transition-all hover:-translate-y-[2px] hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="relative size-32 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 p-2">
        {item.previewImage ? (
          <img
            src={getImageLink(item.previewImage)}
            alt={item.name}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-[10px] font-medium text-neutral-400">
            No Image
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        {/* Title + Total */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-neutral-900">
              {item.name}
            </p>

            {/* Unit price */}
            <p className="mt-0.5 text-xs">
              {priceFormatter(item.price)}{" "}
              <span className="text-neutral-400">×</span> {item.quantity}
            </p>
          </div>

          <div className="text-right">
            <p className="text-subTitle/50 text-[10px] font-bold tracking-wider uppercase">
              Commission Total
            </p>
            <p className="text-2xl font-semibold text-neutral-900">
              {priceFormatter(totalPrice)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-1 flex items-center justify-end">
          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.designId)}
            className="size-12"
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3V18M13 3H3V16V16V16H13V16V16V3V3M5 14H7V5H5V14V14M9 14H11V5H9V14V14M3 3V3V16V16V16V16V16V16V3V3"
                fill="#BB0027"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

{
  /* Quantity Controls */
}
{
  /* <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
            <button
              onClick={() => decreaseQuantity(item.designId)}
              className="rounded p-1 hover:bg-gray-200"
            >
              <Minus size={14} />
            </button>

            <AnimatePresence mode="popLayout">
              <motion.span
                key={item.quantity}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="min-w-[20px] text-center font-medium"
              >
                {item.quantity}
              </motion.span>
            </AnimatePresence>

            <button
              onClick={() =>
                addOrIncrease({
                  designId: item.designId,
                  name: item.name,
                  previewImage: item.previewImage,
                  price: item.price,
                })
              }
              className="rounded p-1 hover:bg-gray-200"
            >
              <Plus size={14} />
            </button>
          </div> */
}

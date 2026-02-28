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
  const { addOrIncrease, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group flex cursor-pointer gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:-translate-y-[2px] hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
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
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Title + Total */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-neutral-900">
              {item.name}
            </p>

            {/* Unit price */}
            <p className="mt-0.5 text-xs text-neutral-500">
              {priceFormatter(item.price)}{" "}
              <span className="text-neutral-400">×</span> {item.quantity}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-neutral-900">
              {priceFormatter(totalPrice)}
            </p>
            <p className="text-[11px] text-neutral-500">Total</p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-1 flex items-center justify-end">
          {/* Remove */}
          <Button
            variant="danger"
            onClick={() => removeFromCart(item.designId)}
            className="flex size-9 items-center justify-center rounded-xl !px-0 !py-0"
          >
            <Trash2 size={16} />
          </Button>
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

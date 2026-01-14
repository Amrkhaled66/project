import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";
import priceFormatter from "src/utils/priceFormmater";
import { CartItem as CartItemType } from "src/context/cart.context";
import { useCart } from "src/context/cart.context";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { addOrIncrease, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = item.price * item.quantity;

  console.log(item);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex gap-4 border-b border-gray-300 pb-4"
    >
      {/* IMAGE */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        {item.previewImage ? (
          <img
            src={item.previewImage}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Title + Price */}
        <div className="flex items-center justify-between">
          <p className="truncate text-lg font-semibold">{item.name}</p>

          <p className="font-medium text-gray-800">
            {priceFormatter(totalPrice)}
          </p>
        </div>

        {/* Quantity + Actions */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
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
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.designId)}
            className="flex items-center gap-1 text-sm text-red-500 transition hover:text-red-700"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "src/context/cart.context";
import Model from "src/components/ui/Model";

const CartGuard = ({ children }: { children: ReactNode }) => {
  const { cartItem } = useCart();
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const isInvalid =
    !cartItem.size ||
    !cartItem.color ||
    !cartItem.borderColor ||
    cartItem.quantity < 1;

  if (isInvalid) {
    if (!showWarning) setShowWarning(true);

    return (
      <>
        {/* Show warning modal */}
        <Model isOpen={showWarning} onClose={() => setShowWarning(false)}>
          <div className="rounded-2xl border bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-xl font-semibold">
              Complete Your Blanket Design
            </h2>
            <p className="text-sm text-neutral-600">
              Please select a size, color, and border color before continuing.
            </p>

            <button
              className="mt-4 w-full rounded-xl bg-black px-4 py-2 text-white hover:bg-neutral-800"
              onClick={() => {
                navigate("/profile/desgin", { replace: true });
                setShowWarning(false);
              }}
            >
              Continue Designing
            </button>
          </div>
        </Model>
      </>
    );
  }

  // If everything is valid → allow access
  return children;
};

export default CartGuard;

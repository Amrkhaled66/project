import React from "react";
import { useCart } from "src/context/cart.context";
const Preview = () => {
  const { cartItem } = useCart();
  return (
    <div className=" ">
      {cartItem?.designImage ? (
        <>
          <img
            src={cartItem.designImage || ""}
            alt="Blanket Preview"
            className="mx-auto max-h-[300px] w-auto rounded-lg border border-neutral-200 object-contain shadow-md"
          />
          <p className="mt-3 text-sm text-neutral-500">
            This is your current design preview
          </p>
        </>
      ) : (
        <p className="text-sm text-neutral-400 italic">
          No design generated yet. Try adding some photos first!
        </p>
      )}
    </div>
  );
};

export default Preview;

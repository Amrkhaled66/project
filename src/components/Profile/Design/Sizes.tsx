import DesginContainer from "./DesginContainer";
import {
  BLANKET_SIZES,
  BlanketSizeId,
  getSizeById,
} from "src/data/blanketSizes";
import { useCart } from "src/context/cart";

const Sizes = () => {
  const { updateSize, cartItem } = useCart();
  const onSelectSize = (id: BlanketSizeId) => updateSize(getSizeById(id));
  const selectedSizeId = cartItem?.size?.id ?? "Lap";
 
  return (
    <DesginContainer header="Blanket Size" className="h-full ">
      <div className="w-full  space-y-3">
        {BLANKET_SIZES.map((s) => {
          const isSelected = selectedSizeId === s.id;

          return (
            <label
              key={s.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="blanketSize"
                  checked={isSelected}
                  onChange={() => onSelectSize(s.id)}
                  className="h-4 w-4 accent-black"
                />
                <span className="text-sm text-neutral-900">
                  {s.id} ({s.cols}" × {s.rows}")
                </span>
              </div>

              <span className="text-sm font-medium text-neutral-800">
                ${s.price.toFixed(2)}
              </span>
            </label>
          );
        })}
      </div>
    </DesginContainer>
  );
};

export default Sizes;

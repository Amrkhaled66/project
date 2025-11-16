import { upgrades } from "src/data/upgrades";
import DesginContainer from "../DesginContainer";
import priceFormmater from "src/utils/priceFormmater";
import { useCart } from "src/context/cart.context";
type AddonsCheckboxProps = {
  selectedUpgrades: string[];
};

export default function AddonsCheckbox({
  selectedUpgrades,
}: AddonsCheckboxProps) {
  const { updateUpgrades } = useCart();
  return (
    <DesginContainer header="Upgrades" className="">
      <div className="space-y-2">
        {upgrades.map((item) => {
          const checked = selectedUpgrades.includes(item.id);

          return (
            <label
              key={item.id}
              className={`block cursor-pointer border-b border-gray-100 py-2.5 transition`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => updateUpgrades(item.id)}
                    className="mr-2.5 accent-black"
                  />
                  <strong className="text-sm text-neutral-900">
                    {item.name}
                  </strong>
                </div>
                <span className="text-sm font-medium text-neutral-800">
                  {priceFormmater(item.price)}
                </span>
              </div>
              {item.description && (
                <p className="ps-6 text-xs leading-snug text-neutral-600">
                  {item.description}
                </p>
              )}
            </label>
          );
        })}
      </div>
    </DesginContainer>
  );
}

import priceFormmater from "src/utils/priceFormmater";

import MainDashButton from "src/components/ui/MainDashButton";
import Sizes from "src/components/Profile/Design/Sizes";
import BlanketColor from "src/components/Profile/Design/BlanketColor";
import BorderColor from "src/components/Profile/Design/BorderColor";
import AddonsCheckbox from "src/components/Profile/Design/Upgrades";
import DesginArea from "src/components/Profile/Design/DesignArea";

import { useCart } from "src/context/cart";
import { upgrades } from "src/data/upgrades";
import { Link } from "react-router-dom";
export default function BlanketDesigner() {
  const { cartItem, updateUpgrades, getCartTotal } = useCart();

  // --- Initialize with current cart or default ---
  const selectedSizeId = cartItem?.size?.id ?? "Lap";
  const blanketColor = cartItem?.color ?? null;
  const borderColor = cartItem?.borderColor ?? null;
  const selectedUpgrades = cartItem?.upgrades?.map((u) => u.id) ?? [];
  const total = getCartTotal();

  return (
    <div className="container mx-auto min-h-dvh space-y-4">
      <div className="page-header flex items-center justify-between font-bold">
        <div className="flex w-full items-center justify-between gap-4">
          <p className="flex space-x-2">
            <span>Total: </span>
            <span>{priceFormmater(total)}</span>
          </p>
          <Link to={"/profile/cart"}>
            <MainDashButton
              className="!w-fit px-4"
              text="Check Out"
              onClick={() => console.log("Proceed to checkout")}
            />
          </Link>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2">
        <div>
          <DesginArea
            borderColor={borderColor}
            blanketColor={blanketColor}
            selectedSizeId={selectedSizeId}
          />
        </div>

        <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto sm:max-h-max">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <Sizes />
              <AddonsCheckbox
                selectedUpgrades={selectedUpgrades}
                onToggleUpgrade={(id) => {
                  let newIds = selectedUpgrades.includes(id)
                    ? selectedUpgrades.filter((u) => u !== id)
                    : [...selectedUpgrades, id];
                  const newUpgrades = upgrades.filter((u) =>
                    newIds.includes(u.id),
                  );
                  updateUpgrades(newUpgrades);
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <BlanketColor />
              <BorderColor />
            </div>
          </div>
          <MainDashButton text="Order Now" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

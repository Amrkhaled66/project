import { JSX, useState } from "react";

import ShippingInfo from "./ShippingInfo";
import PaymentDetails from "./PaymentDetails";

export type Tab = "Shipping Info" | "Payment Details";

type TabRenderer = (onChangeTab: (tab: Tab) => void) => JSX.Element;

const tabs: Record<Tab, TabRenderer> = {
  "Shipping Info": (onChangeTab) => <ShippingInfo onChangeTab={onChangeTab} />,
  "Payment Details": (onChangeTab) => <PaymentDetails />,
};

const CartForm = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Shipping Info");

  const onChangeTab = (tab: Tab) => setActiveTab(tab);

  return (
    <div className="space-y-4">
      <div className="border-mainProfile relative flex h-5 w-full items-center justify-center overflow-hidden rounded-xl border text-center">
        <div
          className={`bg-mainProfile absolute inset-0 h-full transition-all duration-300 ${
            activeTab === "Shipping Info" ? "w-1/2" : "w-full"
          }`}
        />
        <span className="relative z-10 text-black">
          {activeTab === "Shipping Info" ? "50%" : "100%"}
        </span>
      </div>

      {/* Render current tab */}
      {tabs[activeTab](onChangeTab)}
    </div>
  );
};

export default CartForm;

import { useState } from "react";
import ShippingInfo from "./ShippingInfo";
import PaymentDetails from "./PaymentDetails";

export type Tab = "Shipping Info" | "Payment Details";

const CartForm = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Shipping Info");

  const handleNextStep = (nextTab: Tab) => {
    setActiveTab(nextTab);
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="relative flex h-8 w-full items-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div
          className={`bg-mainProfile absolute inset-y-0 left-0 h-full transition-all duration-300 ${
            activeTab === "Shipping Info" ? "w-1/2" : "w-full"
          }`}
        />
        <span className="relative z-10 mx-auto text-xs font-medium text-black sm:text-sm">
          {activeTab === "Shipping Info" ? "50%" : "100%"}
        </span>
      </div>

      {/* Render only the current step */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
        {activeTab === "Shipping Info" ? (
          <ShippingInfo onChangeTab={handleNextStep} />
        ) : (
          <PaymentDetails />
        )}
      </div>
    </div>
  );
};

export default CartForm;

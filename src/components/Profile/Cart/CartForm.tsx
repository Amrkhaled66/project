import ShippingInfo from "./ShippingInfo";

export type Tab = "Shipping Info" | "Payment Details";

const CartForm = ({ values, setValues }: any) => {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
        <ShippingInfo values={values} setValues={setValues} />
      </div>
    </div>
  );
};

export default CartForm;

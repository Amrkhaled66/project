import React from "react";
import ShippingInfo from "./ShippingInfo";

export type Tab = "Shipping Info" | "Payment Details";

type CartFormProps = {
  values: Record<string, any>;
  errors: Record<string, string | undefined>;
  handleChange: (e: any) => void;
  handleSubmit: (e?: React.FormEvent) => void | Promise<void>;
  isPending: boolean;
};

const CartForm = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  isPending,
}: CartFormProps) => {
  return (
    <div>
      <ShippingInfo
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
};

export default CartForm;

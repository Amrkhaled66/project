import React from "react";
import { motion } from "framer-motion";
import FormInput from "src/components/ui/FormInput";
import FormSelect from "src/components/ui/FormSelect";
import FormTextarea from "src/components/ui/FormTeaxtArea";
import Button from "src/components/ui/Button";
import { Tab } from "./CartForm";
import { useStates } from "src/hooks/queries/staticData.queries";

type ShippingInfoProps = {
  values: Record<string, any>;
  errors: Record<string, string | undefined>;
  handleChange: (e: any) => void;
  handleSubmit: (e?: React.FormEvent) => void | Promise<void>;
  isPending: boolean;
  onChangeTab?: (tab: Tab) => void;
};

const ShippingInfo: React.FC<ShippingInfoProps> = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  isPending,
}) => {
  const { data: states } = useStates();

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">Shipping Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Full Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormInput
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        
        <FormSelect
          label="State / Province"
          name="state"
          options={
            states
              ? states.map((s: { name: string; code: string }) => ({
                  label: s.name,
                  value: s.name,
                }))
              : []
          }
          value={values.state}
          onChange={handleChange}
          error={errors.state}
          required
        />

        <FormInput
          label="City"
          name="city"
          value={values.city}
          onChange={handleChange}
          error={errors.city}
          required
        />

        <FormInput
          className="sm:col-span-2"
          label="Address Line 1"
          name="addressLine1"
          value={values.addressLine1}
          onChange={handleChange}
          error={errors.addressLine1}
          required
        />

        <FormInput
          className="sm:col-span-2"
          label="Address Line 2 (optional)"
          name="addressLine2"
          value={values.addressLine2}
          onChange={handleChange}
        />

        <FormInput
          label="ZIP Code"
          name="zip"
          value={values.zip}
          onChange={handleChange}
          error={errors.zip}
          required
        />

        {/* <FormInput
          className="sm:col-span-2"
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        /> */}

        <FormTextarea
          className="sm:col-span-2"
          label="Order Notes (optional)"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <Button isLoading={isPending} type="submit" className="w-full py-3">
        Continue to Payment
      </Button>
    </motion.form>
  );
};

export default ShippingInfo;

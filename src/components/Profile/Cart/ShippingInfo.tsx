import React from "react";
import { motion } from "framer-motion";
import FormInput from "src/components/ui/FormInput";
import FormSelect from "src/components/ui/FormSelect";
import FormTextarea from "src/components/ui/FormTeaxtArea";
import Button from "src/components/ui/Button";
import { Tab } from "./CartForm";

import { useStates } from "src/hooks/queries/staticData.queries";

import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
} from "src/utils/validations/validationRules";

import {
  validateState,
  validateCity,
  validateAddressLine1,
  validateZip,
} from "src/utils/validations/addressValidation";

import { useCart } from "src/context/cart.context";
import { useCreateOrder } from "src/hooks/queries/orders.queries";
import { CreateOrderPayload } from "src/types/Order";

type ShippingInfoProps = {
  values: any;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onChangeTab?: (tab: Tab) => void;
};

const ShippingInfo: React.FC<ShippingInfoProps> = ({
  values,
  setValues,
  onChangeTab,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };
  const { data: states } = useStates();

  const validateAll = () => {
    const newErrors: Record<string, string> = {
      firstName: validateFirstName(values.firstName),
      lastName: validateLastName(values.lastName),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      state: validateState(values.state),
      city: validateCity(values.city),
      addressLine1: validateAddressLine1(values.addressLine1),
      zip: validateZip(values.zip),
    };

    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key],
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateAll()) {
  //     onChangeTab("Payment Details");
  //     window.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const { cartItems, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    const payload: CreateOrderPayload = {
      items: cartItems.map((item: any) => ({
        designId: item.designId,
        quantity: item.quantity,
      })),
      address: values,
    };

    createOrder(payload, {
      onSuccess: (response) => {
        console.log("✅ Order created successfully:", response);
        clearCart();
        window.location.href = response.paymentUrl;
      },
      onError: (error) => {
        console.error("❌ Failed to create order:", error);
      },
    });
  };

  return (
    <motion.form
      onSubmit={handlePayNow}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">Shipping Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="First Name"
          name="firstName"
          value={values?.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />

        <FormInput
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
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

        <FormInput
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />

        <FormInput
          className="sm:col-span-2"
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

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

import React from "react";
import FormInput from "src/components/ui/FormInput";
import FormSelect from "src/components/ui/FormSelect";
import FormTextarea from "src/components/ui/FormTeaxtArea";
import { useCheckoutForm } from "src/hooks/useCheckoutForm";

import { Tab } from "./CartForm";

const COUNTRIES = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "UK" },
  { label: "Egypt", value: "EG" },
];

const CheckoutForm = ({ onChangeTab }: { onChangeTab: (tab: Tab) => void }) => {
  const { form, errors, touched, update, handleBlur, validateAll, isValid } = useCheckoutForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ererer");
    if (validateAll()) {
      onChangeTab("Payment Details"); 
    }
  };

  console.log(errors)
  return (
    <div className="space-y-6">
      <h2 className="page-header text-2xl font-semibold sm:text-3xl">
        Billing & Shipping Information
      </h2>

      <form onSubmit={onSubmit} className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="First Name"
            name="firstName"
            placeholder="Jane"
            value={form.firstName}
            onChange={update("firstName")}
            onBlur={handleBlur("firstName")}
            error={touched.firstName ? errors.firstName : undefined}
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            value={form.lastName}
            onChange={update("lastName")}
            onBlur={handleBlur("lastName")}
            error={touched.lastName ? errors.lastName : undefined}
            required
          />

          <FormInput
            className="sm:col-span-2"
            label="Address"
            name="address"
            placeholder="123 Main St"
            value={form.address}
            onChange={update("address")}
            onBlur={handleBlur("address")}
            error={touched.address ? errors.address : undefined}
            required
          />

          <FormInput
            label="City"
            name="city"
            placeholder="AnyTown"
            value={form.city}
            onChange={update("city")}
            onBlur={handleBlur("city")}
            error={touched.city ? errors.city : undefined}
            required
          />
          <FormInput
            label="ZIP Code"
            name="zip"
            placeholder="12345"
            value={form.zip}
            onChange={update("zip")}
            onBlur={handleBlur("zip")}
            error={touched.zip ? errors.zip : undefined}
            required
          />

          <FormSelect
            label="Country"
            name="country"
            placeholder="Select a country"
            options={COUNTRIES}
            value={form.country}
            onChange={update("country")}
            onBlur={handleBlur("country")}
            error={touched.country ? errors.country : undefined}
            required
          />
          <FormInput
            label="Phone Number"
            name="phone"
            placeholder="(123) 456-7890"
            value={form.phone}
            onChange={update("phone")}
            onBlur={handleBlur("phone")}
            error={touched.phone ? errors.phone : undefined}
            required
          />

          <FormInput
            className="sm:col-span-2"
            label="Email Address"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={update("email")}
            onBlur={handleBlur("email")}
            error={touched.email ? errors.email : undefined}
            required
          />

          <FormTextarea
            className="sm:col-span-2"
            label="Order Notes (optional)"
            name="notes"
            placeholder="Special delivery instructions, gift message, etc."
            value={form.notes}
            onChange={update("notes")}
            rows={4}
          />
        </div>

        <button
          type="submit"
          // disabled={!isValid}
          className="mt-4 w-full rounded-lg bg-gray-400 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          Complete Your Journey
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
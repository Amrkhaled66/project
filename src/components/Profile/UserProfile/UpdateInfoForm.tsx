import React from "react";
import FormInput from "src/components/ui/FormInput";
import MainDashButton from "src/components/ui/MainDashButton";
import { useProfileForm } from "src/hooks/useProfileForm";

export default function UpdateInfoForm() {
  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useProfileForm({
      // you can preload user data here
      initial: { firstName: "", lastName: "", email: "" },
      onSubmit: async (vals) => {
        // Replace with your API call
        const res = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vals),
        });
        if (!res.ok) throw new Error("Failed to update profile");
      },
    });

  return (
    <div className="rounded-xl border border-neutral-200 bg-white sm:p-6">
      {/* Layout: single column on mobile, two columns from lg+ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* First / Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="First Name"
              name="firstName"
              placeholder="Jane"
              value={values.firstName}
              onChange={(e: any) =>
                handleChange("firstName", e.target?.value ?? e)
              }
              error={errors.firstName}
            />
            <FormInput
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={values.lastName}
              onChange={(e: any) =>
                handleChange("lastName", e.target?.value ?? e)
              }
              error={errors.lastName}
            />
          </div>

          {/* Email */}
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={values.email}
            onChange={(e: any) => handleChange("email", e.target?.value ?? e)}
            error={errors.email}
          />

          {/* Password */}
          <FormInput
            label="Change Password"
            name="password"
            type="password"
            placeholder="*******************"
            value={values.password}
            onChange={(e: any) =>
              handleChange("password", e.target?.value ?? e)
            }
            error={errors.password}
          />
        </div>

        {/* Side panel: text + button (stacks on mobile) */}
        <div className="flex flex-col items-center justify-between gap-4 lg:col-span-2 lg:gap-8">
          <p className="text-center text-base font-light text-neutral-600 sm:text-lg">
            Your account details are used for order processing, shipping, and
            communication. Please keep them up to date.
          </p>

          {/* sticky action on mobile */}
          <div className="w-full">
            <div className="sticky bottom-3 lg:hidden">
              <MainDashButton
                text={isSubmitting ? "Saving..." : "Save Your Edits"}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </div>
            <div className="hidden lg:block">
              <MainDashButton
                text={isSubmitting ? "Saving..." : "Save Your Edits"}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

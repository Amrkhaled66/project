import React from "react";
import FormInput from "src/components/ui/FormInput";
import MainDashButton from "src/components/ui/MainDashButton";
export default function UpdateInfoForm() {
  return (
    <div className="flex flex-row gap-6 p-6">
      {/* Top Row - First / Last Name */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="First Name" name="firstName" placeholder="Jane" />
          <FormInput label="Last Name" name="lastName" placeholder="Doe" />
        </div>

        {/* Email */}
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
        />

        {/* Password */}
        <FormInput
          label="Change Password"
          name="password"
          type="password"
          placeholder="*******************"
        />
      </div>

      {/* Row with description text + button */}
      <div className="flex min-w-[40%] pt-5   flex-col items-center justify-between">
        <p className="text-mainProfile-600 max-w-md text-center text-lg font-light">
          Our account details are used for order processing, shipping, and
          communication. Please keep them up to date.
        </p>

        <MainDashButton text="Save Your Edits" />
      </div>
    </div>
  );
}

import FormInput from "src/components/ui/FormInput";
import MainDashButton from "src/components/ui/MainDashButton";
import { useForm } from "src/hooks/useForm";
import { useUpdateUserProfile } from "src/hooks/queries/profile.queries";
import { updateProfileValidation } from "src/utils/validations/updateProfileValidation";
import Alert from "src/components/ui/Alert";
import { useAuth } from "src/context/auth.context";
import PasswordInput from "src/components/ui/PasswordInput";

export default function UpdateInfoForm() {
  const { mutate, isPending } = useUpdateUserProfile();
  const {
    authData: { user },
    updateUser,
  } = useAuth();
  const { name, phone } = user || {
    name: "",
    phone: "",
  };
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: name || "",
      phone: phone || "",
      password: "",
    },

    validate: updateProfileValidation,

    onSubmit: (vals) => {
      mutate(vals, {
        onSuccess: (data) => {
          updateUser(data.data);
          Alert({
            title: "Profile Updated",
            text: "Your profile information has been successfully updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
        },
        onError: () => {
          Alert({
            title: "Profile Update Failed",
            text: "There was an error updating your profile. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border-neutral-200 bg-white sm:p-6 lg:border"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* First / Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Name"
              name="name"
              placeholder="Jane"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            />

            {/* Phone */}
            <FormInput
              label="Phone"
              name="phone"
              type="number"
              placeholder="555-555-5555"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </div>

          {/* Password (optional) */}
          <PasswordInput
            label="Change Password"
            name="password"
            placeholder="*******************"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        {/* Side panel */}
        <div className="flex flex-col items-center justify-between gap-4 lg:col-span-2 lg:gap-8">
          <p className="text-center text-base font-light text-neutral-600 sm:text-lg">
            Your account details are used for order processing, shipping, and
            communication. Please keep them up to date.
          </p>

          <div className="w-full">
            <div className="sticky bottom-3 lg:hidden">
              <MainDashButton
                text={"Save Your Edits"}
                type="submit"
                isLoading={isPending}
              />
            </div>
            <div className="hidden lg:block">
              <MainDashButton
                text={"Save Your Edits"}
                type="submit"
                isLoading={isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

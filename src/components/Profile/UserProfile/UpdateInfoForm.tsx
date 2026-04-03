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
      className="rounded-xl bg-white "
    >
      <div className="flex gap-6">
        {/* Inputs */}
        <div className="flex w-1/2 flex-col gap-6 py-9 p-6">
          {/* First / Last Name */}
          <FormInput
            label="Collector Name"
            name="name"
            placeholder="Jane"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Phone */}
          <FormInput
            label="Contact Phone"
            name="phone"
            type="number"
            placeholder="555-555-5555"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          {/* Password (optional) */}
          <PasswordInput
            label="Update Password"
            name="password"
            placeholder="*******************"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        {/* Side panel */}
        <div className="bg-subTitle/5 flex w-1/2 flex-col justify-between gap-4 p-6 lg:gap-8">
          <div className="space-y-3">
            <h2 className="text-primary-container font-header text-start text-xl font-bold">
              Security & Communications
            </h2>
            <p className="text-subTitle w-[80%] text-start text-base sm:text-lg">
              Your contact information is used for communication, project
              coordination, and delivery of commissioned Jersey Blanket™
              artifacts. Please keep these details current.
            </p>
          </div>

          <div className="w-full">
            <div className="sticky bottom-3 lg:hidden">
              <MainDashButton
                text={"Save Profile Updates"}
                type="submit"
                isLoading={isPending}
              />
            </div>
            <div className="hidden lg:block">
              <MainDashButton
                text={"Save Profile Updates"}
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

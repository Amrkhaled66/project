import { UserPlus2Icon } from "lucide-react";

import AdminPageHeader from "src/components/admin/AdminPageHeader";
import FormInput from "src/components/ui/FormInput";
import PasswordInput from "src/components/ui/PasswordInput";
import Button from "src/components/ui/Button";
import Alert from "src/components/ui/Alert";

import signupValidation from "src/utils/validations/signupValidation";
import { useForm } from "src/hooks/useForm";
import { useAdminCreateUserMutation } from "src/hooks/queries/admin/userMangment.queries";

const AdminAddUserPage = () => {
  const { mutate, isPending } = useAdminCreateUserMutation();

  const { values, errors, handleChange, handleSubmit, updateError, resetForm } =
    useForm({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      validate: signupValidation,
      onSubmit: (values) => {
        mutate(values, {
          onSuccess: () => {
            Alert({
              title: "Success",
              text: "User created successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });

            resetForm();
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message || "Something went wrong";
            updateError(message, "email");
          },
        });
      },
    });
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add New User"
        subtitle="Create a new user from the admin panel"
        icon={UserPlus2Icon}
      />

      <div className="relative overflow-hidden rounded-2xl bg-white bg-gradient-to-br from-gray-50 to-white px-6 py-10 shadow-md">
        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">User Information</h3>
            <p className="text-sm text-gray-500">
              Fill in the details to create a new account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormInput
                label="First Name"
                name="firstName"
                placeholder="John"
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName}
                className="bg-white"
              />

              <FormInput
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                className="bg-white"
              />
            </div>

            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="user@email.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              className="bg-white"
            />

            <FormInput
              label="Phone Number"
              name="phone"
              placeholder="01xxxxxxxxx"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              className="bg-white"
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <PasswordInput
                label="Password"
                name="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="submit" isLoading={isPending}>
                Create User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUserPage;

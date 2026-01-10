import React from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "src/layouts/AuthLayout";
import FormInput from "src/components/ui/FormInput";
import PasswordInput from "src/components/ui/PasswordInput";
import Button from "src/components/ui/Button";
import Alert from "src/components/ui/Alert";
import { ADMIN_PATH } from "src/utils/defaultSettings";

import { useForm } from "src/hooks/useForm";
import { useAdminLogin } from "src/hooks/queries/adminAuth.queries";
import { useAdminContext } from "src/context/adminAuth.context";
const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAdminContext();
  // React Query mutation
  const { mutate: loginMutation, isPending } = useAdminLogin();

  const { values, errors, handleChange, handleSubmit, updateError } = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const newErrors: Partial<typeof values> = {};

      if (!values.email.trim()) {
        newErrors.email = "Email is required";
      }

      if (!values.password.trim()) {
        newErrors.password = "Password is required";
      }

      return newErrors;
    },

    onSubmit: (values) => {
      loginMutation(values, {
        onSuccess: (data) => {
          Alert({
            title: "Success",
            text: "Admin login successful",
            icon: "success",
            confirmButtonText: "OK",
          });

          adminLogin(data);

          navigate(`${ADMIN_PATH}/orders`, { replace: true });
        },

        onError: () => {
          updateError("Invalid email or password", "email");
        },
      });
    },
  });

  return (
    <AuthLayout>
      <div className="flex w-full flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 text-[var(--color-primary)]"
        >
          {/* Email */}
          <FormInput
            label="Admin Email"
            name="email"
            type="email"
            placeholder="Enter admin email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            className="bg-white"
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button isLoading={isPending} className="py-2.5" type="submit">
            Admin Login
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default AdminLoginPage;

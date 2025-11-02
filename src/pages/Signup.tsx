import AuthLayout from "src/layouts/AuthLayout";
import FormInput from "src/components/ui/FormInput";
import PasswordInput from "src/components/ui/PasswordInput";
import Button from "src/components/ui/Button";
import Alert from "src/components/ui/Alert";

import signupValidation from "src/utils/signupValidation";

import { useForm } from "src/hooks/useForm";
import { useRegister } from "src/hooks/auth/useRegister";
import { useAuth } from "src/context/auth.context";
import { useNavigate } from "react-router-dom";
import { useCart } from "src/context/cart.context";
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const { login } = useAuth();
  const { values, errors, handleChange, handleSubmit, updateError } = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate: signupValidation,
    onSubmit: async (values) => {
      registerMutation.mutate(values, {
        onSuccess: (data) => {
          login(data.user, data.token);
          Alert({
            title: "Success",
            text: "Account created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/profile");
        },
        onError: (error: any) => {
          const {
            status,
            data: { message },
          } = error.response || {};
          if (status === 400) {
            updateError(message, "email");
          }
        },
      });
    },
  });

  return (
    <AuthLayout>
      <div className="flex h-auto w-full flex-col items-center overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 text-[var(--color-primary)]"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
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
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            className="bg-white"
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="phone"
            placeholder="Enter your Phone Number"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            className="bg-white"
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>

          <Button type="submit" className="py-2.5">
            Sign Up
          </Button>
          <p
            className="mt-1 text-center text-sm"
            style={{ color: "var(--color-strokeFont)" }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;

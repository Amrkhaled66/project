import React from "react";
import AuthLayout from "src/layouts/AuthLayout";
import FormInput from "src/components/ui/FormInput";
import PasswordInput from "src/components/ui/PasswordInput";
import { useForm } from "src/hooks/useForm";
import { useLogin } from "src/hooks/auth/useLogin";
import Alert from "src/components/ui/Alert";
import { useAuth } from "src/context/auth.context";
import Button from "src/components/ui/Button";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { mutate: loginMutation, isPending } = useLogin();
  const { login } = useAuth();
  const navigate = useNavigate();
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
          login(data.user, data.token);
          Alert({
            title: "Success",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/profile");
        },

        onError: (error: any) => {
          updateError("Error in Email or Password", "email");
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
          {/* Email Input */}
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

          {/* Password Input */}
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button isLoading={isPending} className="py-2.5" type="submit">
            Login
          </Button>

          <p
            className="mt-3 text-center text-sm"
            style={{ color: "var(--color-strokeFont)" }}
          >
            Don’t have an account?
            <a
              href="/register"
              className="font-semibold hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

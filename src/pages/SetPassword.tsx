import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthLayout from "src/layouts/AuthLayout";
import PasswordInput from "src/components/ui/PasswordInput";
import Alert from "src/components/ui/Alert";
import Button from "src/components/ui/Button";

import { useForm } from "src/hooks/useForm";
import {
  useResendSetupEmail,
  useSetPassword,
} from "src/hooks/queries/auth.queries";

type UiState = "form" | "invalid" | "resent";

const SetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const hasToken = Boolean(token);

  const [uiState, setUiState] = useState<UiState>(
    hasToken ? "form" : "invalid",
  );

  const { mutate: setPasswordMutation, isPending: isSettingPassword } =
    useSetPassword();
  const { mutate: resendMutation, isPending: isResending } =
    useResendSetupEmail();

  const { values, errors, handleChange, handleSubmit, updateError } = useForm({
    initialValues: { password: "", confirmPassword: "" },
    validate: (formValues) => {
      const newErrors: Partial<typeof formValues> = {};

      if (!formValues.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formValues.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!formValues.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formValues.confirmPassword !== formValues.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      return newErrors;
    },
    onSubmit: (formValues) => {
      if (!token) {
        setUiState("invalid");
        updateError(
          "Invalid setup link. Please resend setup email.",
          "password",
        );
        return;
      }

      // ✅ Single call: backend decides if token is valid/expired
      setPasswordMutation(
        { password: formValues.password, token }, // <-- pass token (adjust to your API)
        {
          onSuccess: async () => {
            await Alert({
              title: "Success",
              text: "Password has been set successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/login");
          },
          onError: (err: any) => {
            // You can refine this based on your API error shape/status
            // Example: if (err?.response?.status === 401) ...
            setUiState("invalid");
            updateError(
              "Invalid or expired setup link. Please resend setup email.",
              "password",
            );
          },
        },
      );
    },
  });

  const handleResend = () => {
    // If your resend endpoint needs token, pass it. If it needs email, pass email instead.
    // If it doesn't need anything (uses session), then remove the token check.
    if (!token) {
      updateError("Missing setup token.", "password");
      return;
    }

    resendMutation(
      { token },
      {
        onSuccess: async () => {
          setUiState("resent");
          await Alert({
            title: "Sent",
            text: "We sent you a new setup email. Please check your inbox (and spam).",
            icon: "success",
            confirmButtonText: "OK",
          });
        },
        onError: () => {
          updateError("Unable to resend setup email.", "password");
        },
      },
    );
  };

  return (
    <AuthLayout>
      <div className="flex w-full flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 text-[var(--color-primary)]"
        >
          {uiState === "form" && (
            <>
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
                placeholder="Enter your password again"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <Button
                isLoading={isSettingPassword}
                className="py-2.5"
                type="submit"
              >
                Set Password
              </Button>
            </>
          )}

          {uiState === "invalid" && (
            <>
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Link expired or invalid
                  </p>
                  <p className="mt-0.5 text-sm text-red-600/80">
                    This setup link is no longer valid. Request a new one below
                    — it'll arrive in seconds.
                  </p>
                </div>
              </div>

              <Button
                isLoading={isResending}
                className="py-2.5"
                type="button"
                onClick={handleResend}
                disabled={!token}
              >
                Resend Setup Email
              </Button>
            </>
          )}

          {uiState === "resent" && (
            <>
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Email sent!
                  </p>
                  <p className="mt-0.5 text-sm text-green-600/80">
                    A new setup link is on its way. Check your inbox — and spam
                    just in case.
                  </p>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default SetPassword;

import AdminPageHeader from "src/components/admin/AdminPageHeader";
import { UserCheck } from "lucide-react";

import { useForm } from "src/hooks/useForm";
import FormInput from "src/components/ui/FormInput";
import Button from "src/components/ui/Button";

import { useLoginAsUser } from "src/hooks/queries/adminAuth.queries";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type LoginAsUserFormValues = {
  email: string;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const AdminLoginAsUser = () => {
  /* ------------------------------------------------------------------ */
  /* Mutation                                                           */
  /* ------------------------------------------------------------------ */
  const { mutateAsync, isPending } = useLoginAsUser();

  /* ------------------------------------------------------------------ */
  /* Form                                                              */
  /* ------------------------------------------------------------------ */
  const { values, errors, handleChange, handleSubmit, updateError } =
    useForm<LoginAsUserFormValues>({
      initialValues: {
        email: "",
      },
      validate: (values) => {
        const errors: Partial<LoginAsUserFormValues> = {};

        if (!values.email) {
          errors.email = "User email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = "Invalid email format";
        }

        return errors;
      },
      onSubmit: async ({ email }) => {
        try {
          const res = await mutateAsync({ email });

          window.open("/profile", "_blank");
        } catch {
          updateError("User not found or cannot be impersonated", "email");
        }
      },
    });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Log in as User"
        subtitle="Securely access a user account for support and troubleshooting"
        icon={UserCheck}
      />

      <div className="relative overflow-hidden rounded-2xl bg-white bg-gradient-to-br from-gray-50 to-white px-6 py-10 shadow-md">
        <div className="relative mx-auto max-w-md space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">
              Impersonate a User Account
            </h3>
            <p className="text-sm text-gray-500">
              Enter the user’s email to log in as them in a new tab
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="User Email"
              name="email"
              type="email"
              placeholder="user@email.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Button
              type="submit"
              isLoading={isPending}
              className="w-full"
              disabled={!values.email.trim()}
            >
              Log in as User
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginAsUser;

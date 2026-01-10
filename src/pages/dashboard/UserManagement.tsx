import { useNavigate } from "react-router-dom";
import AdminPageHeader from "src/components/admin/AdminPageHeader";
import { User } from "lucide-react";

import { useForm } from "src/hooks/useForm";
import FormInput from "src/components/ui/FormInput";
import Button from "src/components/ui/Button";

import { useAdminUserOverviewByEmailMutation } from "src/hooks/queries/admin/userMangment.queries";

type SearchFormValues = {
  email: string;
};

const UserManagement = () => {
  const navigate = useNavigate();

  /* ------------------------------------------------------------------ */
  /* Mutation                                                           */
  /* ------------------------------------------------------------------ */
  const { mutateAsync, isPending } = useAdminUserOverviewByEmailMutation();

  /* ------------------------------------------------------------------ */
  /* Form                                                               */
  /* ------------------------------------------------------------------ */
  const { values, errors, handleChange, handleSubmit, updateError } =
    useForm<SearchFormValues>({
      initialValues: {
        email: "",
      },
      validate: (values) => {
        const errors: Partial<SearchFormValues> = {};

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = "Invalid email format";
        }

        return errors;
      },
      onSubmit: async ({ email }) => {
        try {
          const data = await mutateAsync(email);
          navigate(`${data.user.id}`, {
            state: {
              user: data.user,
              stats: data.stats,
            },
          });
        } catch {
          updateError("User not found", "email");
        }
      },
    });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="User Management"
        subtitle="Search for a user by email"
        icon={User}
      />

      <div className="relative overflow-hidden rounded-2xl bg-white bg-gradient-to-br from-gray-50 to-white px-6 py-10 shadow-md">
        <div className="relative mx-auto max-w-md space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">User Lookup</h3>
            <p className="text-sm text-gray-500">
              Enter the user’s email to access their profile
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Email Address"
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
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

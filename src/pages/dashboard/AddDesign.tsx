import { Palette } from "lucide-react";

import AdminPageHeader from "src/components/admin/AdminPageHeader";
import FormInput from "src/components/ui/FormInput";
import FormSelect from "src/components/ui/FormSelect";
import Button from "src/components/ui/Button";
import Alert from "src/components/ui/Alert";
import { BLANKET_SIZES, BlanketSizeId } from "src/data/blanketSizes";
import { useForm } from "src/hooks/useForm";
import { useAdminCreateDesignMutation } from "src/hooks/queries/admin/design.queries";

type AddDesignFormValues = {
  email: string;
  name: string;
  startingSize: BlanketSizeId | "";
};

const sizeOptions = BLANKET_SIZES.map((size) => ({
  label: size.name,
  value: size.id,
}));

const validate = (values: AddDesignFormValues) => {
  const errors: Partial<Record<keyof AddDesignFormValues, string>> = {};

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  }

  if (!values.name?.trim()) {
    errors.name = "Blanket name is required";
  }

  if (!values.startingSize) {
    errors.startingSize = "Size is required";
  }

  return errors;
};

const AddDesign = () => {
  const { mutate, isPending } = useAdminCreateDesignMutation();

  const { values, errors, handleChange, handleSubmit, updateError, resetForm } =
    useForm<AddDesignFormValues>({
      initialValues: {
        email: "",
        name: "",
        startingSize: "",
      },
      validate,
      onSubmit: (formValues) => {
        mutate(
          {
            email: formValues.email.trim(),
            name: formValues.name.trim(),
            startingSize: formValues.startingSize as BlanketSizeId,
          },
          {
            onSuccess: () => {
              Alert({
                title: "Success",
                text: "Design created successfully.",
                icon: "success",
                confirmButtonText: "OK",
              });

              resetForm();
            },
            onError: (error: unknown) => {
              const typedError = error as {
                response?: { data?: { message?: string } };
                message?: string;
              };
              const message =
                typedError?.response?.data?.message ||
                typedError?.message ||
                "Failed to create design";
              updateError(message, "email");
            },
          },
        );
      },
    });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add New Design"
        subtitle="Create a design for a specific user by email and starting size"
        icon={Palette}
      />

      <div className="relative rounded-2xl bg-white bg-gradient-to-br from-gray-50 to-white px-6 py-10 shadow-md">
        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">Design Information</h3>
            <p className="text-sm text-gray-500">
              Provide the user email, blanket name, and starting size
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="User Email"
              name="email"
              type="email"
              placeholder="user@email.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              className="bg-white"
            />
            <FormSelect
              label="Starting Size"
              name="startingSize"
              options={sizeOptions}
              value={values.startingSize}
              onChange={handleChange}
              error={errors.startingSize}
              className="bg-white"
              placeholder="Choose starting size"
            />
            <FormInput
              label="Blanket Name"
              name="name"
              placeholder="My Custom Blanket"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              className="bg-white"
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" isLoading={isPending}>
                Create Design
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDesign;

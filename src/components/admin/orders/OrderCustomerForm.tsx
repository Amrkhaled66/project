import { useState } from "react";
import { AdminOrderDetailsResponse } from "src/services/admin/orders.service";
import { useForm } from "src/hooks/useForm";
import FormInput from "src/components/ui/FormInput";
import FormSelect from "src/components/ui/FormSelect";
import Button from "src/components/ui/Button";
import {
  useOrderStatuses,
  useStates,
} from "src/hooks/queries/staticData.queries";
import { useUpdateOrder } from "src/hooks/queries/admin/orders.queries";

import { getChangedFields } from "src/utils/getChangedFields";

type Props = {
  order: AdminOrderDetailsResponse;
};

const OrderCustomerForm = ({ order }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  /* ---------------- LOOKUPS ---------------- */
  const { data: orderStatuses = [] } = useOrderStatuses();
  const { data: states = [] } = useStates();

  const initialFormValues = {
    email: order.user.email,
    firstName: order.user.firstName,
    lastName: order.user.lastName,
    status: order.status,

    addressLine1: order.addressLine1,
    addressLine2: order.addressLine2 || "",
    city: order.city,
    state: order.state,
    zip: order.zip,
    phone: order.phone,
  };

  const onSubmit = (values: any) => {
    const changedFields = getChangedFields(initialFormValues, values);

    // لو مفيش أي تغيير
    if (Object.keys(changedFields).length === 0) {
      setIsEditing(false);
      return;
    }

    updateOrder(
      {
        orderId: order.id,
        payload: changedFields,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  /* ---------------- FORM ---------------- */
  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialValues: initialFormValues,
    onSubmit: onSubmit,
  });

  /* ---------------- CANCEL ---------------- */
  const handleCancel = () => {
    setValues({
      email: order.user.email,
      firstName: order.user.firstName,
      lastName: order.user.lastName,
      status: order.status,

      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2 || "",
      city: order.city,
      state: order.state,
      zip: order.zip,
      phone: order.phone,
    });
    setIsEditing(false);
  };
  /* ---------------- UI ---------------- */
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Customer & Address Information
        </h2>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <div className="flex gap-2">
            <Button isLoading={isPending} type="submit" onClick={handleSubmit}>
              Save
            </Button>
            <Button
              className="border-gray-300 bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* ---------------- CUSTOMER ---------------- */}
      <Section title="Customer">
        <ReadOnlyField label="User ID" value={order.user.id} />

        {isEditing ? (
          <FormInput
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="Email" value={values.email} />
        )}

        {isEditing ? (
          <FormInput
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="First Name" value={values.firstName} />
        )}

        {isEditing ? (
          <FormInput
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="Last Name" value={values.lastName} />
        )}

        <div className="md:col-span-2">
          {isEditing ? (
            <FormSelect
              label="Order Status"
              name="status"
              value={values.status}
              options={orderStatuses.map((status: string) => ({
                label: status.replaceAll("_", " "),
                value: status,
              }))}
              onChange={(value) =>
                handleChange({
                  target: { name: "status", value: value.target.value },
                } as any)
              }
            />
          ) : (
            <ReadOnlyField label="Order Status" value={values.status} />
          )}
        </div>
      </Section>

      {/* ---------------- ADDRESS ---------------- */}
      <Section title="Shipping Address">
        {isEditing ? (
          <FormInput
            label="Address Line 1"
            name="addressLine1"
            value={values.addressLine1}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="Address Line 1" value={values.addressLine1} />
        )}

        {isEditing ? (
          <FormInput
            label="Address Line 2"
            name="addressLine2"
            value={values.addressLine2}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="Address Line 2" value={values.addressLine2} />
        )}

        {isEditing ? (
          <FormInput
            label="City"
            name="city"
            value={values.city}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="City" value={values.city} />
        )}

        {isEditing ? (
          <FormSelect
            label="State"
            name="state"
            value={values.state}
            options={states.map((s: { name: string; code: string }) => ({
              label: s.name,
              value: s.code,
            }))}
            onChange={(value) => {
              console.log(value);
              handleChange({
                target: { name: "state", value: value.target.value },
              } as any);
            }}
          />
        ) : (
          <ReadOnlyField label="State" value={values.state} />
        )}

        {isEditing ? (
          <FormInput
            label="ZIP Code"
            name="zip"
            value={values.zip}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="ZIP Code" value={values.zip} />
        )}

        {isEditing ? (
          <FormInput
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        ) : (
          <ReadOnlyField label="Phone" value={values.phone} />
        )}
      </Section>
    </div>
  );
};

/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
  </div>
);

const ReadOnlyField = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <span className="block text-sm font-medium text-gray-700">{label}</span>
    <div className="mt-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600">
      {value || "-"}
    </div>
  </div>
);

export default OrderCustomerForm;

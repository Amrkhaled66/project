import React from "react";
import CartItem from "src/components/Profile/Cart/CartItem";
import CartSummary from "src/components/Profile/Cart/CartSummary";
import CartForm from "src/components/Profile/Cart/CartForm";
import { useCart } from "src/context/cart.context";
import {
  validateFullName,
  validateEmail,
  validatePhone,
} from "src/utils/validations/validationRules";
import {
  validateState,
  validateCity,
  validateAddressLine1,
  validateZip,
} from "src/utils/validations/addressValidation";
import { CreateOrderPayload } from "src/types/Order";
import { useForm } from "src/hooks/useForm";
import { useAuth } from "src/context/auth.context";
import { useCreateInvoice } from "src/hooks/queries/invoice.queries";

const Cart = () => {
  const {
    authData: { user },
  } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateInvoice();

  const initialValues = React.useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      state: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
      zip: "",
      notes: "",
    }),
    [user?.email, user?.name, user?.phone],
  );

  const { values, errors, handleChange, handleSubmit, setValues } = useForm({
    initialValues,
    validate: (formValues) => {
      const newErrors = {
        name: validateFullName(formValues.name),
        email: validateEmail(formValues.email),
        phone: validatePhone(formValues.phone),
        state: validateState(formValues.state),
        city: validateCity(formValues.city),
        addressLine1: validateAddressLine1(formValues.addressLine1),
        zip: validateZip(formValues.zip),
      };

      Object.keys(newErrors).forEach(
        (key) =>
          !newErrors[key as keyof typeof newErrors] &&
          delete newErrors[key as keyof typeof newErrors],
      );

      return newErrors;
    },
    onSubmit: async (submittedValues) => {
      const payload: CreateOrderPayload = {
        items: cartItems.map((item: any) => ({
          designId: item.designId,
          quantity: item.quantity,
        })),
        address: submittedValues,
      };

      createOrder(payload, {
        onSuccess: (response) => {
          clearCart();
          window.location.href = response.paymentUrl;
        },
        onError: (error) => {
          console.error("Failed to create order:", error);
        },
      });
    },
  });

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues, setValues]);

  return (
    <div className="mx-auto space-y-5 lg:space-y-10">
      <div className="page-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">Your Cart Items</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-6 lg:col-span-8">
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.designId} item={item} />
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty</p>
            )}
          </div>

          <CartForm
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        </div>

        <div className="lg:col-span-4">
          <CartSummary state={values.state} />
        </div>
      </div>
    </div>
  );
};

export default Cart;

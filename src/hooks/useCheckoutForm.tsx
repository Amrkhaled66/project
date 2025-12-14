import { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const REQUIRED_FIELDS: (keyof FormState)[] = [
  "firstName",
  "lastName",
  "address",
  "city",
  "zip",
  "country",
  "phone",
  "email",
];

export const useCheckoutForm = () => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  const validateField = (key: keyof FormState, value: string): string => {
    switch (key) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : "";
      case "address":
        return value.trim() === "" ? "Address is required" : "";
      case "city":
        return value.trim() === "" ? "City is required" : "";
      case "zip":
        if (value.trim() === "") return "ZIP code is required";
        if (!/^\d{5}(-\d{4})?$/.test(value)) return "Invalid ZIP code format";
        return "";
      case "country":
        return value === "" ? "Please select a country" : "";
      case "phone":
        if (value.trim() === "") return "Phone number is required";
        if (!/^[\d\s\-\(\)]+$/.test(value)) return "Invalid phone number";
        return "";
      case "email":
        if (value.trim() === "") return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      default:
        return "";
    }
  };

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = e.target.value;
      setForm((p) => ({ ...p, [key]: value }));

      // Validate on change if field was touched
      if (touched[key]) {
        const error = validateField(key, value);
        setErrors((p) => ({ ...p, [key]: error }));
      }
    };

  const handleBlur = (key: keyof FormState) => () => {
    setTouched((p) => ({ ...p, [key]: true }));
    const error = validateField(key, form[key]);
    setErrors((p) => ({ ...p, [key]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const newTouched: Partial<Record<keyof FormState, boolean>> = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof FormState>).forEach((key) => {
      if (key !== "notes") {
        const error = validateField(key, form[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
        newTouched[key] = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);

    return isValid;
  };
  

  const isValid =
    form.firstName &&
    form.lastName &&
    form.address &&
    form.city &&
    form.zip &&
    form.country &&
    form.phone &&
    form.email &&
    Object.values(errors).every((error) => !error);

  return {
    form,
    errors,
    touched,
    update,
    handleBlur,
    validateAll,
    isValid,
  };
};

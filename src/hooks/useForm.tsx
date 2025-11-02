import { useState } from "react";

interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(values);
    }
  };

  const updateError = (error: string, field: keyof T) => {
    setErrors((prev) => {
      return {
        ...prev,
        [field]: error,
      };
    });
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    updateError,
  };
}

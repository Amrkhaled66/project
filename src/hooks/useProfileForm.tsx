import { useCallback, useMemo, useState } from "react";

export type ProfileValues = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string; // optional update
};

export type UseProfileFormOpts = {
  initial?: Partial<ProfileValues>;
  onSubmit?: (vals: ProfileValues) => Promise<void> | void;
};

export function useProfileForm(opts: UseProfileFormOpts = {}) {
  const { initial = {}, onSubmit } = opts;

  const [values, setValues] = useState<ProfileValues>({
    firstName: initial.firstName || "",
    lastName:  initial.lastName  || "",
    phone:     initial.phone     || "",
    password:  "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileValues,string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isDirty = useMemo(
    () => Object.values(values).some(Boolean),
    [values]
  );

  const validate = useCallback((v: ProfileValues) => {
    const e: Partial<Record<keyof ProfileValues,string>> = {};
    if (!v.firstName.trim()) e.firstName = "First name is required.";
    if (!v.lastName.trim())  e.lastName  = "Last name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.phone)) e.phone = "Enter a valid phone.";
    if (v.password && v.password.length < 8) e.password = "Min 8 characters.";
    return e;
  }, []);

  const handleChange = useCallback(
    (name: keyof ProfileValues, value: string) => {
      setValues(prev => ({ ...prev, [name]: value }));
      setTouched(prev => ({ ...prev, [name]: true }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, validate, values]);

  return {
    values, errors, touched, isDirty, isSubmitting,
    handleChange, handleSubmit,
    setValues, setErrors,
  } as const;
}

import { validateFirstName, validatePhone, validatePassword } from "./validationRules";

export const updateProfileValidation = (values: {
  name: string;
  phone: string;
  password: string;
}) => {
  const errors: Partial<typeof values> = {};

  const name = validateFirstName(values.name);
  if (name) errors.name = name;

  const ph = validatePhone(values.phone);
  if (ph) errors.phone = ph;

  // Password is OPTIONAL — validate only if user typed something
  if (values.password?.trim()) {
    const pw = validatePassword(values.password);
    if (pw) errors.password = pw;
  }

  return errors;
};

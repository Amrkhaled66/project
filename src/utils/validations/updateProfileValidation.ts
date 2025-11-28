import { validateFirstName, validateLastName, validatePhone, validatePassword } from "./validationRules";

export const updateProfileValidation = (values: {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}) => {
  const errors: Partial<typeof values> = {};

  const fn = validateFirstName(values.firstName);
  if (fn) errors.firstName = fn;

  const ln = validateLastName(values.lastName);
  if (ln) errors.lastName = ln;

  const ph = validatePhone(values.phone);
  if (ph) errors.phone = ph;

  // Password is OPTIONAL — validate only if user typed something
  if (values.password?.trim()) {
    const pw = validatePassword(values.password);
    if (pw) errors.password = pw;
  }

  return errors;
};

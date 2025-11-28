import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from "./validationRules";

export const signupValidation = (values: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: Partial<typeof values> = {};

  // 👤 Names
  const firstNameErr = validateFirstName(values.firstName);
  if (firstNameErr) errors.firstName = firstNameErr;

  const lastNameErr = validateLastName(values.lastName);
  if (lastNameErr) errors.lastName = lastNameErr;

  // 📧 Email
  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;

  // 📱 Phone
  const phoneErr = validatePhone(values.phone);
  if (phoneErr) errors.phone = phoneErr;

  // 🔐 Password
  const passwordErr = validatePassword(values.password);
  if (passwordErr) errors.password = passwordErr;

  // 🔐 Confirm password
  const confirmPasswordErr = validateConfirmPassword(
    values.password,
    values.confirmPassword,
  );
  if (confirmPasswordErr) errors.confirmPassword = confirmPasswordErr;

  return errors;
};

export default signupValidation;

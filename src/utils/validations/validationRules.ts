// --------------------------------------
// 🔤 Name Validation
// --------------------------------------
export const validateFullName = (value: string) => {
  if (!value.trim()) return "Full name is required";
  if (value.trim().split(" ").length < 2)
    return "Full name must include both first and last name";
  return "";
};
export const validateFirstName = (value: string) => {
  if (!value.trim()) return "First name is required";
  if (value.trim().length < 3)
    return "First name must be at least 3 characters";
  return "";
};

export const validateLastName = (value: string) => {
  if (!value.trim()) return "Last name is required";
  if (value.trim().length < 3) return "Last name must be at least 3 characters";
  return "";
};

// --------------------------------------
// 📧 Email Validation
// --------------------------------------
export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) return "Email is required";
  if (!emailRegex.test(value)) return "Please enter a valid email address";

  return "";
};

// --------------------------------------
// 📱 Phone Validation
// --------------------------------------
export const validatePhone = (value: string) => {
  const phoneRegex =
    /^\(?([2-9][0-9]{2})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

  if (!value) return "Phone number is required";
  if (!phoneRegex.test(value))
    return "Enter a valid US phone number (e.g., 555-555-5555)";

  return "";
};

// --------------------------------------
// 🔐 Password Validation
// --------------------------------------
export const validatePassword = (value: string) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!value) return "Password is required";
  if (!strongPasswordRegex.test(value))
    return "Password must be at least 8 characters, include uppercase, lowercase, number, and a special character";

  return "";
};

// --------------------------------------
// 🔐 Confirm Password
// --------------------------------------
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";

  return "";
};

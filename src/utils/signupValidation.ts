const signupValidation = (values: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  const newErrors: Partial<typeof values> = {};

  // 👤 First & Last Name
  if (!values.firstName.trim()) newErrors.firstName = "First name is required";
  if (!values.lastName.trim()) newErrors.lastName = "Last name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) newErrors.email = "Email is required";
  else if (!emailRegex.test(values.email))
    newErrors.email = "Please enter a valid email address";

  const phoneRegex =
    /^\(?([2-9][0-9]{2})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  if (!values.phone) newErrors.phone = "Phone number is required";
  else if (!phoneRegex.test(values.phone))
    newErrors.phone = "Enter a valid US phone number (e.g., 555-555-5555)";

  const password = values.password;
  const strongPasswordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!password) newErrors.password = "Password is required";
  else if (!strongPasswordRegex.test(password))
    newErrors.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and a special character";

  if (!values.confirmPassword)
    newErrors.confirmPassword = "Please confirm your password";
  else if (password !== values.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";

  return newErrors;
};

export default signupValidation;

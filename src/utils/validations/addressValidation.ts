export const validateZip = (value: string) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;

  if (!value) return "ZIP code is required";
  if (!zipRegex.test(value))
    return "Enter a valid ZIP code (e.g., 12345 or 12345-6789)";

  return "";
};

export const validateAddressLine1 = (value: string) => {
  if (!value.trim()) return "Address is required";
  if (value.trim().length < 5) return "Address must be more specific";
  return "";
};

export const validateCity = (value: string) => {
  if (!value.trim()) return "City is required";
  if (value.trim().length < 2) return "City name must be at least 2 characters";
  return "";
};

export const validateState = (value: string) => {
  if (!value) return "State is required";
  return "";
};

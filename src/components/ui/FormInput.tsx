import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  error?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  className = "",
  error,
}) => {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-lg font-medium">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`h-9 rounded-md border px-3 text-sm outline-none placeholder:text-gray-400 focus:ring-0 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
};

export default FormInput;
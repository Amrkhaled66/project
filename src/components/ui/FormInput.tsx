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
  disabled?: boolean;
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
  disabled,
  className = "",
  error,
}) => {
  return (
    <label className={`flex flex-col gap-1`}>
      <span className="text-start font-medium text-sm">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        className={`rounded-xl border hide-arrows animate px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:ring-0 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400"
        } ${className}`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
};

export default FormInput;

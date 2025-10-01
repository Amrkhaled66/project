import React from "react";

type Option = { label: string; value: string };

type FormSelectProps = {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  error?: string;
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  required,
  className = "",
  placeholder,
  error,
}) => {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-lg font-medium">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`h-9 rounded-md border bg-white px-3 text-sm outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400"
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
};

export default FormSelect;
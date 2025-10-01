import React from "react";

type FormTextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  rows?: number;
  error?: string;
};

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  className = "",
  rows = 4,
  error,
}) => {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-lg font-medium">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        rows={rows}
        className={`rounded-md border px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-0 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
};

export default FormTextarea;
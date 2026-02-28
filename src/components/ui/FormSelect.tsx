import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = { label: string; value: string };

type FormSelectProps = {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  error?: string;
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
    },
  }),
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  required,
  className = "",
  placeholder = "Select an option",
  error,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Label */}
      <label className="mb-1 block">
        {label} {required && "*"}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-12 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm transition ${
          error
            ? "border-red-500"
            : open
              ? "border-gray-900"
              : "border-gray-300"
        } `}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption?.label || placeholder}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500"
        >
          ▾
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={dropdownVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-50 mt-2 max-h-50 w-full overflow-auto rounded-lg border bg-white shadow-lg"
          >
            {options.map((option, index) => (
              <motion.li
                key={option.value}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => {
                  onChange?.({ target: { name: name, value: option.value } } as any);
                  setOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 text-sm transition hover:bg-gray-100 ${
                  option.value === value ? "bg-gray-100 font-medium" : ""
                } `}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1 block text-sm text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Hidden input (for forms / accessibility / submit) */}
      <input type="hidden" name={name} value={value || ""} />
    </div>
  );
};

export default FormSelect;

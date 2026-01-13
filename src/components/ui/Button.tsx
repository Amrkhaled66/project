const Button = ({
  className,
  children,
  type = "button",
  isLoading = false,
  onClick,
  disabled
}: {
  className?: string;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  onClick?:()=>void;
  disabled?: boolean;
}) => {
  console.log(disabled,"ddd")
  return (
    <button
      type={type}
      className={`bg-primary disabled:opacity-50 disabled:hover:bg-primary disabled:text-white disabled:!cursor-not-allowed px-3 py-2 border-primary hover:text-primary group animate rounded-lg border-1 font-medium text-white hover:bg-transparent ${className}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="inline-block size-5 animate-spin rounded-full border-2 border-white group-hover:border-[var(--color-primary)] !border-t-transparent"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

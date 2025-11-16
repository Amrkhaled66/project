const Button = ({
  className,
  children,
  type = "button",
  isLoading = false,
}: {
  className?: string;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
}) => {
  return (
    <button
      type={type}
      className={`bg-primary border-primary hover:text-primary group animate rounded-lg border-1 font-medium text-white hover:bg-transparent ${className}`}
      disabled={isLoading}
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

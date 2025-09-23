const Button = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-primary border-primary hover:text-primary animate rounded-xl border-1 font-medium text-white hover:bg-transparent ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

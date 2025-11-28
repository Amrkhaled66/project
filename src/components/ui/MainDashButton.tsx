const MainDashButton = ({
  text,
  onClick,
  className,
  icon,
  type = "button",
  isLoading,
  disabled,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`bg-mainProfile-600 group hover:text-mainProfile-600 border-mainProfile-600 animate flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-white hover:bg-transparent ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? (
        <span className="inline-block size-5 animate-spin rounded-full border-2 border-white !border-t-transparent group-hover:border-[var(--color-primary)]"></span>
      ) : (
        <>
          {icon && <span className="ml-2 inline-block">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default MainDashButton;

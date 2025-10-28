const MainDashButton = ({
  text,
  onClick,
  disabled,
  className,
  icon,
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-mainProfile-600 hover:text-mainProfile-600 border-mainProfile-600 animate flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-white hover:bg-transparent ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="ml-2 inline-block">{icon}</span>}
      {text}
    </button>
  );
};

export default MainDashButton;

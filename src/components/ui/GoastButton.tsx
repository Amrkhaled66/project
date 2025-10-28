const GoastButton = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`animate rounded-xl border-1 border-gray-500 bg-transparent py-2 font-medium text-gray-500 hover:bg-gray-500 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default GoastButton;

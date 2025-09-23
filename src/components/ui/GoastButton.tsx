const GoastButton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-transparent border-gray-500 hover:text-white animate rounded-xl border-1 font-medium text-gray-500 hover:bg-gray-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default GoastButton;

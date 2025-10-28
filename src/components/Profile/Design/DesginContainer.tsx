const DesginContainer = ({
  className,
  header,
  subHeader,
  children,
}: {
  className?: string;
  header?: string;
  subHeader?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`bg-mainProfile flex h-full flex-col justify-between space-y-4 rounded-xl p-4 ${className}`}
    >
      <div className="page-header h-fit">
        <h2 className="text-xl font-medium">{header}</h2>
        {subHeader && <h3 className="text-lg text-neutral-500">{subHeader}</h3>}
      </div>
      <div className="h-auto flex-1">{children}</div>
    </div>
  );
};

export default DesginContainer;

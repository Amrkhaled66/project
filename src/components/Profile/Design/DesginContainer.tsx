const DesginContainer = ({
  className,
  header,
  subHeader,
  children,
  headerComponenet,
}: {
  className?: string;
  header?: string;
  subHeader?: string;
  children?: React.ReactNode;
  headerComponenet?: React.ReactNode;
}) => {
  return (
    <div
      className={`bg-mainProfile flex flex-col justify-between space-y-4 rounded-xl p-4 ${className}`}
    >
      <div className="page-header flex h-fit items-start justify-between">
        <div className="space-y-1 max-w-[75%]">
          <h2 className="text-xl font-medium">{header}</h2>
          {subHeader && (
            <h3 className="text-lg text-neutral-500">{subHeader}</h3>
          )}
        </div>
        {headerComponenet}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DesginContainer;

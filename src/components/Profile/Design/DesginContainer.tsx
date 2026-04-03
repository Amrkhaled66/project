const DesginContainer = ({
  className,
  header,
  subHeader,
  children,
  headerComponent,
}: {
  className?: string;
  header?: string;
  subHeader?: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col justify-between space-y-4 rounded-3xl bg-white p-4 drop-shadow-sm ${className}`}
    >
      <div className="flex h-fit items-start justify-between">
        <div className="space-y-1">
          <h2 className="font-header font-bold text-xl">{header}</h2>
          {subHeader && (
            <h3 className="max-w-[75%] text-sm text-subTitle">
              {subHeader}
            </h3>
          )}
        </div>
        {headerComponent}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DesginContainer;

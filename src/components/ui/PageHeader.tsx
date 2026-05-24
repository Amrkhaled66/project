const PageHeader = ({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-4 lg:gap-5 ${className}`}
    >
      {/* Title */}
      <h1 className="font-header text-[#0C2340] font-extrabold leading-tight 
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="font-subTitle text-gray-600 leading-relaxed 
                     text-sm sm:text-base md:text-lg 
                     max-w-full sm:max-w-xl lg:max-w-2xl"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
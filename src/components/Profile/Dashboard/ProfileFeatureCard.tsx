import { ReactNode } from "react";

const ProfileFeatureCard = ({
  Icon,
  title,
  subTitle,
  buttonText,
}: {
  Icon: ReactNode;
  title: string;
  subTitle: string;
  buttonText: string;
}) => {
  return (
    <div className="animate flex h-full flex-col items-center justify-between gap-y-5 rounded-xl bg-mainProfile px-4 py-5 shadow-sm hover:shadow-lg sm:px-6">
      {/* icon can scale via parent text size if you wrap it */}
      <div className="text-2xl sm:text-3xl">{Icon}</div>

      <div className="space-y-1 text-center">
        <p className="text-lg font-semibold sm:text-xl">{title}</p>
        <p className="text-sm text-gray-700 sm:text-base">{subTitle}</p>
      </div>

      <button className="animate w-full rounded-lg border border-mainProfile-600 bg-mainProfile-600 py-2 font-bold text-white hover:bg-transparent hover:text-mainProfile-600">
        {buttonText}
      </button>
    </div>
  );
};

export default ProfileFeatureCard;

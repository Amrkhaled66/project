import { ReactNode } from "react";
import { Link } from "react-router-dom";

const ProfileFeatureCard = ({
  Icon,
  title,
  subTitle,
  buttonText,
  to,
}: {
  Icon: ReactNode;
  title: string;
  subTitle: string;
  buttonText: string;
  to: string;
}) => {
  return (
    <div className="animate bg-mainProfile flex h-full flex-col items-center justify-between gap-y-5 rounded-xl px-4 py-5 shadow-sm hover:shadow-lg sm:px-6">
      {/* icon can scale via parent text size if you wrap it */}
      <div className="text-2xl sm:text-3xl">{Icon}</div>

      <div className="space-y-1 text-center">
        <p className="text-lg font-semibold sm:text-xl">{title}</p>
        <p className="text-sm text-gray-700 sm:text-base">{subTitle}</p>
      </div>

      <Link className="w-full" to={to}>
        <button className="animate border-mainProfile-600 bg-mainProfile-600 hover:text-mainProfile-600 w-full rounded-lg border py-2 font-bold text-white hover:bg-transparent">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default ProfileFeatureCard;

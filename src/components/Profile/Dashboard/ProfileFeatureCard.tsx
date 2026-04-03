import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
    <div className="animate flex h-full flex-col items-center justify-between gap-y-5 rounded-3xl bg-white px-4 py-8 shadow-sm hover:shadow-lg sm:px-6">
      {/* icon can scale via parent text size if you wrap it */}
      <div className="text-2xl sm:text-3xl">{Icon}</div>

      <div className="space-y-1 text-center">
        <p className="text-lg font-semibold sm:text-xl">{title}</p>
        <p className="text-sm text-[#44474D]">{subTitle}</p>
      </div>

      <Link className="w-full" to={to}>
        <button className="animate flex w-full items-center gap-2 justify-center rounded-2xl border  bg-primary-container py-3 text-white hover:bg-secondary hover:text-white">
          {buttonText}
          <ArrowUpRight size={15} />
        </button>
      </Link>
    </div>
  );
};

export default ProfileFeatureCard;

import { ImageIcon, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useCart } from "src/context/cart.context";
import { useLatestDesign } from "src/hooks/queries/design.queries";
import priceFormatter from "src/utils/priceFormmater";
import getImageLink from "src/utils/getImageLink";
const CurrentDesignCard = () => {
  const { cartItems } = useCart();
  const { data: latestDesign, isLoading, isError } = useLatestDesign();

  // ----------------------------------
  // Loading state
  // ----------------------------------
  if (isLoading) {
    return <CurrentDesignSkeleton />;
  }

  // ----------------------------------
  // Error / Empty
  // ----------------------------------
  if (isError) {
    return null;
  }

  if (!latestDesign) {
    return <NoDesignCTA />;
  }

  // ----------------------------------
  // Cart relation
  // ----------------------------------
  const cartItem = cartItems.find((item) => item.designId === latestDesign.id);

  const quantity = cartItem?.quantity ?? 0;
  const totalPrice = latestDesign.price * quantity;

  // ----------------------------------
  // Render
  // ----------------------------------
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg transition hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary-container/10 flex h-10 w-10 items-center justify-center rounded-full">
          <ImageIcon className="text-pribg-primary-container" />
        </div>
        <h2 className="text-pribg-primary-container text-lg font-semibold">
          Blueprint™ In Progress
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Image */}
        <div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 md:w-40">
          {latestDesign.previewImage ? (
            <img
              src={getImageLink(latestDesign.previewImage)}
              alt={latestDesign.name}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              No Preview
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-2">
            <p className="text-base font-semibold text-gray-900">
              {latestDesign.name}
            </p>

            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <p>
                Price:{" "}
                <span className="font-medium text-gray-900">
                  {priceFormatter(latestDesign.price)}
                </span>
              </p>

              <p>
                Quantity:{" "}
                <span className="font-medium text-gray-900">{quantity}</span>
              </p>
            </div>
          </div>

          {/* Total */}
          {quantity > 0 && (
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-secondary text-base font-semibold">
                {priceFormatter(totalPrice)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <Link
        to={`/profile/design-library/${latestDesign.id}`}
        className="group bg-primary-container hover:bg-secondary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition-all duration-300"
      >
        Continue Blueprint™
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};

export default CurrentDesignCard;

const NoDesignCTA = () => {
  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-10 text-start shadow-lg">
      {/* Icon */}
      <div className="bg-secondary/10 flex size-16 items-center justify-center rounded-xl">
        <ImageIcon className="text-secondary h-7 w-7" />
      </div>

      {/* Text */}
      <div className="max-w-xs space-y-2">
        <h3 className="font-header text-primary-container text-2xl font-semibold">
          No Design Yet
        </h3>
        <p className="font-subTitle text-subTitle text-sm leading-relaxed">
          Start crafting your first Blueprint™ and bring your vision to life.
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/profile/design-library"
        className="group bg-secondary flex w-fit items-center justify-center gap-2 rounded-full px-10 py-4 text-sm font-medium text-white transition-all duration-300"
      >
        Create New Design
        <Plus
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};
const CurrentDesignSkeleton = () => {
  return (
    <div className="flex w-full flex-col space-y-6 rounded-xl  bg-white py-4 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 px-4">
        <Skeleton circle width={24} height={24} />
        <Skeleton width={220} height={22} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 md:flex-row">
        {/* Image */}
        <Skeleton width={160} height={128} className="rounded-lg" />

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="space-y-2">
            <Skeleton width="60%" height={18} />
            <Skeleton width="40%" height={16} />
            <Skeleton width="50%" height={16} />
          </div>

          <Skeleton width="30%" height={18} />
        </div>
      </div>

      {/* Button */}
      <div className="px-4">
        <Skeleton height={48} className="rounded-xl" />
      </div>
    </div>
  );
};

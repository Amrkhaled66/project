import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useCart } from "src/context/cart.context";
import { useLatestDesign } from "src/hooks/queries/design.queries";
import priceFormatter from "src/utils/priceFormmater";

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

  if(!latestDesign) {
    console.log("first")
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
    <div className="flex w-full flex-col space-y-6 rounded-xl border-2 bg-white py-4 shadow-md transition hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4">
        <ImageIcon />
        <p className="text-xl font-semibold">Your Design In Progress</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 md:flex-row">
        {/* Image */}
        <div className="flex-shrink-0">
          {latestDesign.previewImage ? (
            <img
              src={import.meta.env.VITE_API_URL + latestDesign.previewImage}
              alt={latestDesign.name}
              className="h-32 w-40 rounded-lg border object-contain"
            />
          ) : (
            <div className="flex h-32 w-40 items-center justify-center rounded-lg border bg-gray-100 text-sm text-gray-400">
              No Preview
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between gap-2 text-sm">
          <div className="space-y-1">
            <p className="text-base font-semibold">{latestDesign.name}</p>

            <p>
              Price:
              <span className="font-medium">
                {priceFormatter(latestDesign.price)}
              </span>
            </p>

            <p>
              Quantity in cart:
              <span className="font-medium">{quantity}</span>
            </p>
          </div>

          {quantity > 0 && (
            <p className="pt-1 text-sm font-semibold">
              Total:
              <span>{priceFormatter(totalPrice)}</span>
            </p>
          )}
        </div>
      </div>

      {/* Action */}
      <Link
        to={`/profile/design/${latestDesign.id}`}
        className="mx-auto w-[90%] rounded-xl border border-black/70 bg-black py-3 text-center text-white transition hover:bg-white hover:text-black lg:w-[80%]"
      >
        Complete Your Design
      </Link>
    </div>
  );
};

export default CurrentDesignCard;

const CurrentDesignSkeleton = () => {
  return (
    <div className="flex w-full flex-col space-y-6 rounded-xl border-2 bg-white py-4 shadow-md">
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


const NoDesignCTA = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border-2 bg-white py-10 shadow-md">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <ImageIcon className="h-7 w-7 text-gray-500" />
      </div>

      <div className="space-y-1 text-center">
        <p className="text-lg font-semibold">
          No Design Yet
        </p>
        <p className="text-sm text-gray-500">
          Start creating your first design and bring it to life.
        </p>
      </div>

      <Link
        to="/profile/design-library"
        className="mt-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        Create New Design
      </Link>
    </div>
  );
};

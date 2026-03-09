import { CircleDashed, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLatestOrder } from "src/hooks/queries/orders.queries";

const CurrentOrderCard = () => {
  const { data: order, isLoading, isError } = useLatestOrder();

  if (isLoading) {
    return (
      <div className="animate flex h-fit w-full flex-col space-y-6 rounded-xl border-2 bg-white p-4 shadow-md">
        <div className="flex items-center gap-3 px-2">
          <Skeleton circle height={32} width={32} />
          <Skeleton height={20} width={180} />
        </div>

        <div className="flex w-full flex-col gap-4">
          <Skeleton
            height={44}
            className="mx-auto w-[90%] rounded-xl lg:w-[80%]"
          />

          <div className="mx-auto w-[90%] rounded-lg bg-gray-100 p-4 lg:w-[80%]">
            <Skeleton height={14} width={150} />
            <Skeleton height={14} width={120} className="mt-2" />
          </div>

          <Skeleton height={16} width={200} className="mx-4" />
        </div>
      </div>
    );
  }

  // ❌ Error
  if (isError) {
    return (
      <div className="rounded-xl border-2 bg-white p-6 text-center shadow-md">
        <p className="text-neutral-700">Unable to fetch your order.</p>
      </div>
    );
  }

  // 📨 No Active Commissions
  if (!order) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border-2 bg-white p-6 text-center shadow-md">
        <div className="rounded-full bg-neutral-100 p-4">
          <PackageSearch className="h-8 w-8 text-neutral-500" />
        </div>

        <p className="text-lg font-semibold">No Active Commissions</p>
        <p className="max-w-[240px] text-sm text-neutral-600">
          Your commissioned Jersey Blanket™ builds will appear here as they
          progress through review and production.
        </p>

        <Link to="/profile/orders" className="mt-3">
          <button className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800">
            View Commission Archive™
          </button>
        </Link>
      </div>
    );
  }

  // ✅ Latest Order UI
  return (
    <div className="flex h-fit w-full flex-col space-y-10 rounded-xl border-2 bg-white py-4 shadow-md hover:shadow-lg">
      <div className="flex items-center gap-3 px-4">
        <CircleDashed />
        <p className="text-xl font-semibold">Current Commission Status</p>
      </div>

      <div className="flex w-full flex-col justify-center gap-y-4">
        <Link to="/profile/orders" className="mx-auto w-[90%] lg:w-[80%]">
          <button className="w-full rounded-xl border border-black/70 bg-black py-3 text-white transition hover:bg-white hover:text-black">
            View Commission Details
          </button>
        </Link>

        <div className="mx-auto w-[90%] rounded-lg bg-gray-200 px-4 py-3 lg:w-[80%]">
          <p className="font-semibold">
            <span>Commission ID: </span>
            <span>{order.id}</span>
          </p>
          <p className="text-sm text-neutral-700">
            <span>Status: </span>
            <span className="capitalize">{order.status}</span>
          </p>
        </div>

        {/* <p className="px-4 text-sm lg:text-base">
          <span>Estimated Delivery Time: </span>
          <span>{order.estimatedDeliveryDate || "Not available yet"}</span>
        </p> */}
      </div>
    </div>
  );
};

export default CurrentOrderCard;

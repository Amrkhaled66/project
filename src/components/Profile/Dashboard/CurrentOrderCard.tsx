import { CircleDashed, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLatestOrder } from "src/hooks/queries/orders.queries";
import { ArrowRight } from "lucide-react";
const CurrentOrderCard = () => {
  const { data: order, isLoading, isError } = useLatestOrder();

  if (isLoading) {
    return (
      <div className="animate flex h-fit w-full flex-col space-y-6 rounded-xl  bg-white p-4 shadow-md">
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
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 px-10 text-start drop-shadow-md">
        <div className="w-fit rounded-full bg-neutral-100 p-4">
          <PackageSearch className="h-8 w-8 text-neutral-500" />
        </div>

        <p className="font-header text-2xl font-bold">No Active Commissions</p>
        <p className="font-subTitle text-subTitle max-w-[80%]">
          Your commissioned Jersey Blanket™ builds will appear here as they
          progress through review and production.
        </p>

        <Link to="/profile/orders" className="mt-3">
          <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-secondary">
            View Commission Archive™
            <ArrowRight size={14} />
          </button>
        </Link>
      </div>
    );
  }

  return (
 <div className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
  {/* Header */}
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C2340]/10">
      <CircleDashed className="text-[#0C2340]" />
    </div>
    <h2 className="text-lg font-semibold text-[#0C2340]">
      Current Commission Status
    </h2>
  </div>

  {/* Content */}
  <div className="flex flex-col gap-5">
    {/* Info Card */}
    <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
      <p className="text-sm text-gray-500">Commission ID</p>
      <p className="text-base font-semibold text-gray-900">
        {order.id}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-gray-500">Status</p>

        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary capitalize">
          {order.status}
        </span>
      </div>
    </div>

    {/* CTA */}
    <Link to="/profile/orders" className="w-full">
      <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-secondary">
        View Commission Details
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </Link>
  </div>
</div>
  );
};

export default CurrentOrderCard;

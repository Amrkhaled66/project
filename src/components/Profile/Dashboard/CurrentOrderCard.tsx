import { CircleDashed } from "lucide-react";
import Order from "src/types/Order";
import { Link } from "react-router-dom";
const CurrentOrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="animate flex h-fit w-full cursor-pointer flex-col space-y-10 rounded-xl border-2 bg-white py-4 shadow-md hover:shadow-lg">
      <div className="flex items-center gap-3 px-4">
        <CircleDashed />
        <p className="text-xl font-semibold">Current Order Status</p>
      </div>

      <div className="flex w-full flex-col justify-center gap-y-4">
        <Link to="/profile/orders" className="mx-auto w-[90%] lg:w-[80%]">
          <button className="animate w-full rounded-xl border border-black/70 bg-black py-3 text-white hover:bg-white hover:text-black">
            View Order Details
          </button>
        </Link>

        <div className="mx-auto w-[90%] rounded-lg bg-gray-200 px-4 py-3 lg:w-[80%]">
          <p className="font-semibold">
            <span>Order Id: </span>
            <span>{order.id}</span>
          </p>
          <p className="text-strokeFont text-sm">
            <span>Status: </span>
            <span>{order.status}</span>
          </p>
        </div>

        <p className="px-4 text-sm lg:text-base">
          <span>Estimated Delivery Time: </span>
          <span>{order.estimatedDeliveryDate}</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentOrderCard;

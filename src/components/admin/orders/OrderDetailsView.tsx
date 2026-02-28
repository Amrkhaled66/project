import { AdminOrderDetailsResponse } from "src/services/admin/orders.service";
import OrderCustomerForm from "./OrderCustomerForm";
import OrderItemsList from "./OrderItemsList";
import { ORDER_STATUS } from "src/utils/defaultSettings";
type Props = {
  order: AdminOrderDetailsResponse;
};

const OrderDetailsView = ({ order }: Props) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Created: {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${order.totalPrice}
            </div>
            <div
              className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                ORDER_STATUS[order.status].color
              }`}
            >
              {order.status}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <OrderCustomerForm order={order} />

      {/* Items */}
      <OrderItemsList items={order.items} />
    </div>
  );
};

export default OrderDetailsView;

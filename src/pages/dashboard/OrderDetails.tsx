import { useParams } from "react-router-dom";
import { Package } from "lucide-react";

import AdminPageHeader from "src/components/admin/AdminPageHeader";
import { useAdminOrderDetails } from "src/hooks/queries/admin/orders.queries";
import OrderDetailsView from "src/components/admin/orders/OrderDetailsView";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: order,
    isLoading,
    isError,
  } = useAdminOrderDetails(id);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading order details…</p>;
  }

  if (isError || !order) {
    return (
      <p className="text-sm text-red-500">
        Failed to load order details
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Order Details"
        subtitle={`Order ID: ${order.id}`}
        icon={Package}
      />

      {/* Details UI */}
      <OrderDetailsView order={order} />
    </div>
  );
};

export default OrderDetails;

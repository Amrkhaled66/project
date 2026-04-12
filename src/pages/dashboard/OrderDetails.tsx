import { useParams } from "react-router-dom";
import { Package } from "lucide-react";

import AdminPageHeader from "src/components/admin/AdminPageHeader";
import OrderShipmentSection from "src/components/admin/orders/OrderShipmentSection";
import {
  useAdminOrderDetails,
  useCreateShipment,
} from "src/hooks/queries/admin/orders.queries";
import OrderDetailsView from "src/components/admin/orders/OrderDetailsView";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useAdminOrderDetails(id);
  const { mutate: createShipment, isPending: isCreatingShipment } =
    useCreateShipment();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading order details…</p>;
  }

  if (isError || !order) {
    return <p className="text-sm text-red-500">Failed to load order details</p>;
  }

  const handleConfirmShipment = () => {
    createShipment(order.id);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Order Details"
        subtitle={`Order ID: ${order.id}`}
        icon={Package}
      />

      <div className="space-y-4 p-6">
        <OrderShipmentSection
          order={order}
          isCreatingShipment={isCreatingShipment}
          onCreateShipment={handleConfirmShipment}
        />

        <OrderDetailsView order={order} />
      </div>
    </div>
  );
};

export default OrderDetails;

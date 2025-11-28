import { useState } from "react";
import Table from "src/components/ui/Table";
import { Eye } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLatestThreeOrders } from "src/hooks/queries/orders.queries";
import { statusColors } from "src/utils/defaultSettings";
import Model from "src/components/ui/Model";
import OrderModal from "src/components/Profile/Orders/OrderModel";

const OrdersTable = () => {
  const { data, isPending, isError } = useLatestThreeOrders();

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const headers = [
    { key: "id", label: "Order Id" },
    { key: "totalPrice", label: "Amount" },
    { key: "item", label: "Item" },
    { key: "placed", label: "Placed" },

    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        const colorClass =
          statusColors[value as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-700";

        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${colorClass}`}
          >
            {value}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "",
      render: (_: any, row: any) => (
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setSelectedOrder(row)}
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  // -------------------------------------------
  // 🔄 Skeleton Loading
  // -------------------------------------------
  if (isPending) {
    const skeletonRows = Array.from({ length: 3 }).map((_, i) => ({
      id: `skeleton-${i}`, // MUST be a string/number
      totalPrice: <Skeleton width={80} />,
      item: <Skeleton width={90} />,
      placed: <Skeleton width={80} />,
      status: <Skeleton width={90} />,
      actions: <Skeleton width={40} />,
    }));

    return <Table label="My Orders" headers={headers} data={skeletonRows} />;
  }

  // -------------------------------------------
  // ❌ Error
  // -------------------------------------------
  if (isError) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
        <p className="text-neutral-600">Failed to load your orders.</p>
      </div>
    );
  }

  // -------------------------------------------
  // 🟢 Transform data for table rows
  // -------------------------------------------
  const rows = (data || []).map((order: any) => {
    const cart =
      typeof order.cartSnapshot === "string"
        ? JSON.parse(order.cartSnapshot)
        : order.cartSnapshot;

    return {
      id: order.id,
      totalPrice: `$${order.totalPrice}`,
      item: cart?.size?.name || "Blanket",
      placed: new Date(order.createdAt).toLocaleDateString(),
      status: order.status,
      actions: order,
      cartSnapshot: order.cartSnapshot,
      designImage: order.designImage,
      createdAt: order.createdAt,
    };
  });

  return (
    <>
      <Table label="My Orders" headers={headers} data={rows} />

      <Model isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </Model>
    </>
  );
};

export default OrdersTable;

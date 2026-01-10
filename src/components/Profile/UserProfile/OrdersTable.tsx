import { useState } from "react";
import { Eye, Link } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Table from "src/components/ui/Table";
import Model from "src/components/ui/Model";
import OrderModal from "src/components/Profile/Orders/OrderModel";

import { useLatestThreeOrders } from "src/hooks/queries/orders.queries";
import { ORDER_STATUS } from "src/utils/defaultSettings";

const OrdersTable = () => {
  const { data = [], isPending, isError } = useLatestThreeOrders();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  /* ---------------- Table Headers ---------------- */
  const headers = [
    { key: "id", label: "Order ID" },
    { key: "amount", label: "Amount" },
    { key: "placed", label: "Placed" },
    { key: "invoice Link", label: "Invoice Link" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        const colorClass =
          (typeof value === "string" &&
            ORDER_STATUS[value.toLowerCase() as keyof typeof ORDER_STATUS]) ||
          "bg-neutral-100 text-neutral-700";

        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${colorClass}`}
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
          className="text-neutral-500 hover:text-neutral-700"
          onClick={() => setSelectedOrder(row.original)}
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  /* ---------------- Loading State ---------------- */
  if (isPending) {
    const skeletonRows = Array.from({ length: 3 }).map((_, i) => ({
      id: `skeleton-${i}`,
      amount: <Skeleton width={80} />,
      item: <Skeleton width={100} />,
      placed: <Skeleton width={80} />,
      status: <Skeleton width={90} />,
      actions: <Skeleton width={40} />,
    }));

    return <Table label="My Orders" headers={headers} data={skeletonRows} />;
  }

  /* ---------------- Error State ---------------- */
  if (isError) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
        <p className="text-neutral-600">Failed to load your orders.</p>
      </div>
    );
  }

  /* ---------------- Data Mapping ---------------- */
  const rows = data.map((order: any) => {
    const firstItem = order.items?.[0];
    const design = firstItem?.designSnapshot;

    return {
      id: order.id.slice(0, 8),
      amount: `$${order.totalPrice}`,
      placed: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "—",
      status: order.status,
      "invoice Link":  <a
          href={order.invoiceUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 underline"
        >
          <Link size={14} /> Invoice
        </a>,
      actions: null,
      original: order,
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

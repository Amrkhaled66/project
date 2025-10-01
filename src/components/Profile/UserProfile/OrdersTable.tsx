import Table from "src/components/ui/Table";
import { Check, X, Eye, MoreVertical } from "lucide-react";

const headers = [
  { key: "id", label: "Order Id" },
  { key: "amount", label: "Amount" },
  { key: "item", label: "Item" },
  { key: "placed", label: "Placed" },
  {
    key: "status",
    label: "Status",

    render: (value: string) =>
      value === "Delivered" || value === "Paid" ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          <Check size={14} /> Delivered
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
          <X size={14} /> Cancelled
        </span>
      ),
  },
  {
    key: "actions",
    label: "",
    render: (_: any, row: any) => (
      <div className="flex items-center gap-2">
        <button className="text-gray-500 hover:text-gray-700">
          <Eye size={18} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVertical size={18} />
        </button>
      </div>
    ),
  },
];

const data = [
  {
    id: "27.10.23",
    amount: "$1245",
    item: "Purchase",
    placed: "ABC Bank",
    status: "Delivered",
  },
  {
    id: "26.09.23",
    amount: "$124",
    item: "Subscription",
    placed: "XYZ Finance",
    status: "Cancelled",
  },
];

const OrdersTable = () => {
  return <Table label="My Orders" headers={headers} data={data} />;
};

export default OrdersTable;

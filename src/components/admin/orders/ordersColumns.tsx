import { useNavigate } from "react-router-dom";
import { AdminOrder } from "src/types/adminOrder.types";
import { ORDER_STATUS_OPTIONS } from "src/config/orderStatusOptions";
import Button from "src/components/ui/Button";
import { ADMIN_PATH } from "src/utils/defaultSettings";
import { ORDER_STATUS } from "src/utils/defaultSettings";
export const useOrdersColumns = () => {
  const navigate = useNavigate();

  return [
    /* ---------------------------------------------------------------------- */
    /* Order ID                                                               */
    /* ---------------------------------------------------------------------- */
    {
      name: "Order ID",
      selector: (row: AdminOrder) => row.id,
      sortable: true,
      grow: 1,
      style: {
        justifyContent: "flex-start",
        fontWeight: 500,
        color: "#111827",
      },
    },

    /* ---------------------------------------------------------------------- */
    /* User Email                                                             */
    /* ---------------------------------------------------------------------- */
    {
      name: "User Email",
      selector: (row: AdminOrder) => row.userEmail,
      sortable: true,
      style: {
        justifyContent: "flex-start",
        color: "#374151",
        fontSize: "13px",
      },
    },

    /* ---------------------------------------------------------------------- */
    /* Order Status (Dropdown)                                                */
    /* ---------------------------------------------------------------------- */
    // {
    //   name: "Order Status",
    //   cell: (row: AdminOrder) => (
    //     <div className="relative">
    //       <select
    //         defaultValue={row.status}
    //         onChange={(e) => {
    //           const newStatus = e.target.value;
    //           // 🔜 API integration later
    //           console.log("Change status:", row.id, newStatus);
    //         }}
    //         className="
    //           rounded-full border border-gray-300 bg-white px-4 py-1.5
    //           text-xs font-medium text-gray-700 shadow-sm
    //           focus:border-primary focus:outline-none
    //           hover:bg-gray-50
    //         "
    //       >
    //         {ORDER_STATUS_OPTIONS.map((option) => (
    //           <option key={option.value} value={option.value}>
    //             {option.label}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   ),
    //   center: true,
    //   grow: 1,
    // },

    /* ---------------------------------------------------------------------- */
    /* Actions                                                                */
    /* ---------------------------------------------------------------------- */
    {
      name: "Actions",
      cell: (row: AdminOrder) => (
        <Button
          className="px-4 py-1 text-xs"
          onClick={() => navigate(`${ADMIN_PATH}/orders/${row.id}`)}
        >
          View Order
        </Button>
      ),
    },
    {
      name: "Status",
      cell: (row: AdminOrder) => (
        <span
          className={`rounded-full px-2 py-0.5 text-center text-xs font-medium ${
            ORDER_STATUS[row.status as keyof typeof ORDER_STATUS]?.color
          }`}
        >
          {row.status.replaceAll("_", " ")}
        </span>
      ),
      sortable: true,
      style: {
        justifyContent: "flex-start",
        color: "#374151",
        fontSize: "13px",
      },
    },
  ];
};

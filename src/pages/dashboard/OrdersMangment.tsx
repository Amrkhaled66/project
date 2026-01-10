import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ClipboardList } from "lucide-react";

import Table from "src/components/ui/DataTable";
import FormSelect from "src/components/ui/FormSelect";
import { AdminOrder } from "src/types/adminOrder.types";
import { useOrdersColumns } from "src/components/admin/orders/ordersColumns";
import AdminPageHeader from "src/components/admin/AdminPageHeader";
import { useAdminOrders } from "src/hooks/queries/admin/orders.queries";
import { useDebounce } from "src/hooks/useDebounce";

/* -------------------------------------------------------------------------- */
/* Constants                                                                   */
/* -------------------------------------------------------------------------- */
const PAGE_SIZE = 5;

const ORDER_STATUS_OPTIONS = [
  { label: "All Orders", value: "ALL" },
  { label: "Pending Payment", value: "PENDING_PAYMENT" },
  { label: "Paid", value: "PAID" },
  { label: "In Design", value: "IN_DESIGN" },
  { label: "Design Approved", value: "DESIGN_APPROVED" },
  { label: "In Production", value: "IN_PRODUCTION" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */
const OrdersManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  /* ✅ Debounced search value */
  const debouncedSearch = useDebounce(search, 500);

  /* 🔹 Reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  /* 🔹 Fetch orders (server-side filtering) */
  const { data, isLoading, isError } = useAdminOrders({
    page,
    limit,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    search: debouncedSearch.trim() || undefined,
  });

  const columns = useOrdersColumns();

  /* 🔹 Normalize API data */
  const orders: AdminOrder[] = useMemo(() => {
    if (!data) return [];

    return data.data.map((o) => ({
      id: o.id,
      status: o.status as any,
      userEmail: o.user.email,
    }));
  }, [data]);

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[400px] items-center justify-center"
      >
        <p className="text-red-500 font-medium">Failed to load orders</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <AdminPageHeader
        title="Orders Management"
        subtitle="Manage and track all customer orders in one place"
        icon={ClipboardList}
      />

      {/* Filters */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Search Orders
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order ID or email"
                className="w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div className="w-full lg:w-64">
            <FormSelect
              label="Order Status"
              name="status"
              value={statusFilter}
              options={ORDER_STATUS_OPTIONS}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <Table<AdminOrder>
          columns={columns}
          data={orders}
          loading={isLoading}
          pagination
          paginationServer
          pageSize={limit}
          totalRows={data?.meta.totalOrders ?? 0}
          onPageChange={setPage}
          onPageSizeChange={(size: number) => {
            setLimit(size);
            setPage(1);
          }}
        />
      </div>
    </motion.div>
  );
};

export default OrdersManagement;

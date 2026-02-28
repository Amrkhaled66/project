import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layers3, Search } from "lucide-react";
import { TableColumn } from "react-data-table-component";

import Table from "src/components/ui/DataTable";
import FormSelect from "src/components/ui/FormSelect";
import AdminPageHeader from "src/components/admin/AdminPageHeader";
import { useAdminDesigns } from "src/hooks/queries/admin/design.queries";
import { useDebounce } from "src/hooks/useDebounce";
import {
  AdminDesignListItem,
} from "src/services/admin/design.service";
import priceFormmater from "src/utils/priceFormmater";
import getImageLink from "src/utils/getImageLink";

const PAGE_SIZE = 5;

const DESIGN_STATUS_OPTIONS = [
  { label: "All Builds", value: "ALL" },
  { label: "Sold", value: "sold" },
  { label: "Unsold", value: "unsold" },
];

const PremiumBuilds = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading, isError } = useAdminDesigns({
    page,
    limit,
    status:
      statusFilter !== "ALL" ? (statusFilter as "sold" | "unsold") : undefined,
    search: debouncedSearch.trim() || undefined,
  });

  const columns: TableColumn<AdminDesignListItem>[] = useMemo(
    () => [
      {
        name: "Build",
        grow: 2,
        cell: (row) => (
          <div className="flex items-center gap-3 py-2">
            <div className="h-14 w-14 overflow-hidden rounded-xl bg-gray-100">
              {row.previewImage ? (
                <img
                  src={getImageLink(row.previewImage)}
                  alt={row.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-gray-400">
                  No Preview
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">{row.name}</p>
              <p className="truncate text-xs w-1/2 text-gray-500">{row.id}</p>
            </div>
          </div>
        ),
      },
      {
        name: "Customer",
        grow: 1.6,
        cell: (row) => (
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {row.user?.name || "Unknown"}
            </p>
            <p className="truncate text-xs text-gray-500">
              {row.user?.email || "No email"}
            </p>
          </div>
        ),
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
        cell: (row) => (
          <span className="font-medium text-gray-800">
            {priceFormmater(Number(row.price || 0))}
          </span>
        ),
      },
      {
        name: "Status",
        sortable: true,
        cell: (row) => (
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              row.isSold
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {row.isSold ? "Sold" : "Unsold"}
          </span>
        ),
      },
      {
        name: "Created",
        sortable: true,
        cell: (row) => (
          <span className="text-sm text-gray-600">
            {new Date(row.createdAt).toLocaleDateString()}
          </span>
        ),
      },
    ],
    [],
  );

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[400px] items-center justify-center"
      >
        <p className="font-medium text-red-500">Failed to load premium builds</p>
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
      <AdminPageHeader
        title="Premium Builds"
        subtitle="Review saved designs and filter sold vs unsold builds"
        icon={Layers3}
      />

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="max-w-md flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Search Builds
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by build ID, name, or email"
                className="w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="w-full lg:w-64">
            <FormSelect
              label="Build Status"
              name="status"
              value={statusFilter}
              options={DESIGN_STATUS_OPTIONS}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <Table<AdminDesignListItem>
          columns={columns}
          data={data?.data || []}
          loading={isLoading}
          pagination
          paginationServer
          paginationPerPage={limit}
          pageSize={limit}
          totalRows={data?.meta.totalDesigns ?? 0}
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

export default PremiumBuilds;

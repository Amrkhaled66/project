import { motion } from "framer-motion";
import DataTable, {
  TableStyles,
  TableColumn,
} from "react-data-table-component";

/* -------------------------------------------------------------------------- */
/* Custom Styles                                                              */
/* -------------------------------------------------------------------------- */
const customStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },

  headRow: {
    style: {
      background: "linear-gradient(to right, #F9FAFB, #F3F4F6)",
      borderRadius: "12px",
      minHeight: "56px",
      borderBottom: "1px solid #E5E7EB",
    },
  },

  headCells: {
    style: {
      fontWeight: 700,
      fontSize: "13px",
      color: "#111827",
      padding: "16px",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
    },
  },

  rows: {
    style: {
      minHeight: "60px",
      fontSize: "14px",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #F1F5F9",
      transition: "background-color 0.2s ease",
    },

    highlightOnHoverStyle: {
      backgroundColor: "#F8FAFC",
      boxShadow: "inset 4px 0 0 #3B82F6",
      cursor: "pointer",
    },
  },

  cells: {
    style: {
      padding: "16px",
      whiteSpace: "normal",
      wordBreak: "break-word",
      alignItems: "center",
    },
  },

  pagination: {
    style: {
      borderTop: "1px solid #E5E7EB",
      padding: "14px",
      background: "#FAFAFA",
      borderBottomLeftRadius: "16px",
      borderBottomRightRadius: "16px",
    },

    pageButtonsStyle: {
      borderRadius: "8px",
      height: "36px",
      width: "36px",
      margin: "0 4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: "transparent",
      fill: "#6B7280",

      "&:hover:not(:disabled)": {
        backgroundColor: "#EFF6FF",
        fill: "#3B82F6",
      },

      "&:disabled": {
        cursor: "not-allowed",
        fill: "#D1D5DB",
      },
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */
type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];

  /* pagination */
  pagination?: boolean;
  paginationPerPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;

  paginationServer?: boolean;
  pageSize?: number;
  /* states */
  loading?: boolean;

  /* UI */
  noDataText?: string;
  onPageSizeChange: (pageSize: number) => void;
};

export default function Table<T>({
  data,
  columns,
  pagination = false,
  paginationPerPage = 10,
  totalRows,
  onPageChange,
  onRowsPerPageChange,

  loading = false,
  noDataText = "No data available",

  onPageSizeChange,
  ...rest
}: TableProps<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <DataTable<T>
        {...rest}
        columns={columns}
        data={data}
        /* UI */
        responsive
        highlightOnHover
        progressPending={loading}
        /* Pagination */
        pagination={pagination}
        paginationServer={!!totalRows}
        paginationTotalRows={totalRows}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsPerPageChange}
        /* Empty state */
        noDataComponent={
          !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="py-12 text-center"
            >
              <p className="font-semibold text-gray-700">{noDataText}</p>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )
        }
        customStyles={customStyles}
      />
    </motion.div>
  );
}

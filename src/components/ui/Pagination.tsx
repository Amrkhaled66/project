import React from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  pageCount: number;
  onPageChange: (page: number) => void; // 1-based
  currentPage?: number; // 1-based
  className?: string;
};

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage = 1,
  className = "",
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel="Prev"
      nextLabel="Next"
      pageCount={pageCount}
      forcePage={currentPage - 1} // react-paginate uses 0-based index
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      renderOnZeroPageCount={null}
      containerClassName={`flex justify-center mt-6 gap-2 ${className}`}
      pageClassName="flex items-center justify-center size-10 text-sm cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 transition"
      pageLinkClassName="w-full h-full flex items-center justify-center"
      activeClassName="bg-main text-white hover:!bg-main"
      previousClassName="flex items-center justify-center px-4 h-10 rounded border border-gray-300 hover:bg-gray-100 transition"
      nextClassName="flex items-center justify-center px-4 h-10 rounded border border-gray-300 hover:bg-gray-100 transition"
      disabledClassName="opacity-50 !cursor-not-allowed"
      breakClassName="flex items-center justify-center size-10 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 transition"
    />
  );
};

export default Pagination;

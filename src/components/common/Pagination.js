"use client";

import { useState } from "react";

export default function Pagination({ totalEvents, payload, setPayload }) {
  const [currentPage, setCurrentPage] = useState(payload.pageNo);
  const [pageLimit, setPageLimit] = useState(payload.limit);

  const totalPages = Math.ceil(totalEvents / pageLimit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setPayload({ pageNo: newPage, limit: pageLimit });
    }
  };

  const handleLimitChange = (event) => {
    setPageLimit(parseInt(event.target.value));
    setCurrentPage(1);
    setPayload({ pageNo: 1, limit: parseInt(event.target.value) });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="pageLimit" className="font-bold">
          Items per page:
        </label>
        <select
          id="pageLimit"
          value={pageLimit}
          onChange={handleLimitChange}
          className="px-2 py-1 border rounded"
        >
          {[10, 20, 30, 40, 50].map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

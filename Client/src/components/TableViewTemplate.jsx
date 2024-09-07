import React, { useState } from "react";

const TableViewTemplate = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate the rows to display based on pagination
  const displayedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#5B99C2] text-white">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-lg font-medium uppercase tracking-wider"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#EEEEEE] divide-y divide-gray-300">
            {displayedRows.map((row) => (
              <tr key={row.id} className="hover:bg-[#DDDDDD]">
                {columns.map((column, index) => {
                  const value = row[column.id];
                  return (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                    >
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-3 mr-3">
        <div className="text-sm text-gray-700 ml-2">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage + rowsPerPage, rows.length)} of{" "}
          {rows.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-[#323643] text-white rounded hover:bg-[#606470]"
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, Math.ceil(rows.length / rowsPerPage) - 1)
              )
            }
            className="px-4 py-2 bg-[#323643] text-white rounded hover:bg-[#606470]"
            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
          >
            Next
          </button>
          <select
            value={rowsPerPage}
            onChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            className="px-3 py-2 text-black sm:px-1 border border-gray-600 rounded "
          >
            {[5, 10, 25, 100].map((option) => (
              <option key={option} value={option}>
                Show {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default TableViewTemplate;

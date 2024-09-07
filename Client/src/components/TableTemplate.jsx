import React, { useState } from "react";

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate the rows to display based on pagination
  const displayedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="max-h-60 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#06113C] text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="px-4 py-2 text-left text-xs mt-3 md:text-lg lg:text-lg font-bold uppercase tracking-wider"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-2 text-center text-xs  md:text-xl lg:text-lg font-bold uppercase ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#a2add0] divide-y divide-gray-300 ">
              {displayedRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-2 border-white hover:bg-white transition-colors duration-300 ease-in-out"
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <td
                        key={column.id}
                        className="px-4 py-2 text-sm md:text-lg lg:text-lg font-bold text-[#212121] border-2 border-white"
                        style={{ textAlign: column.align }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 text-center">
                    <ButtonHaver row={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 bg-[#55679C]">
        <div className="text-sm text-white ml-2">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage + rowsPerPage, rows.length)} of{" "}
          {rows.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className=" px-1 sm:px-4 md:px-4 lg:px-4 py-2 bg-[#06113C] text-white rounded hover:bg-[#313c65]"
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
            className="px-4 py-2 bg-[#06113C] text-white rounded hover:bg-[#313c65]"
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
            className="px-4 py-2 border border-gray-300 rounded mr-8"
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

export default TableTemplate;
// #a2add0

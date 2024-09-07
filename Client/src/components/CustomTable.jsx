import React from "react";

const CustomTable = ({
  headers,
  data,
  expandableData,
  expandedRowId,
  onRowClick,
}) => {
  const handleRowClick = (subId) => {
    if (onRowClick) onRowClick(subId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleRowClick(row.subId)}
                className="cursor-pointer hover:bg-gray-100"
              >
                {headers.map((header, idx) => (
                  <td
                    key={idx}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {row[header.toLowerCase().replace(" ", "")]}
                  </td>
                ))}
                {expandableData && expandableData(row).length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {expandableData(row)}
                  </td>
                )}
              </tr>
              {expandedRowId && expandableData && (
                <tr className="bg-gray-50">
                  <td colSpan={headers.length}>{expandableData(row)}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

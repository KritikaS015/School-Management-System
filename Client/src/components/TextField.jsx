import React from "react";

const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextField;

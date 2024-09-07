import React from "react";

const CustomButton = ({
  onClick,
  color = "blue",
  children,
  type = "button",
}) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-700 text-white m-2",
    error: "bg-red-500 hover:bg-red-700 text-white",
    green: "bg-green-500 hover:bg-green-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 font-semibold rounded ${colorClasses[color]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {children}
    </button>
  );
};

export default CustomButton;

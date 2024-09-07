import React from "react";

const SpeedDialTemplate = ({ actions }) => {
  return (
    <div className="fixed bottom-4 right-4">
      {/* <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition">
        <span className="text-lg font-bold">+</span>
      </button> */}
      <div className="absolute bottom-12 right-0 flex flex-row gap-2">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.action}
            className="bg-[#06113C] text-white p-2 rounded-lg shadow-lg hover:bg-[#26235e] transition flex items-center gap-3"
          >
            <span className="text-xl">{action.icon}</span>
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedDialTemplate;

// TabComponent.js
import React, { useState } from "react";

const TabComponent = ({ sections }) => {
  const [selectedTab, setSelectedTab] = useState(sections[0].id);

  const handleTabChange = (id) => {
    setSelectedTab(id);
  };

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleTabChange(section.id)}
            className={`px-4 py-2 text-sm font-medium ${
              selectedTab === section.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {sections.map((section) =>
          selectedTab === section.id ? (
            <div key={section.id}>{section.content}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabComponent;

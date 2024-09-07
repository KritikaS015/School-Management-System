// Tabs.jsx
import React, { useState } from "react";

export const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <TabList>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            isSelected: index === selectedTab,
            onClick: () => setSelectedTab(index),
          })
        )}
      </TabList>
      <div>{React.Children.toArray(children)[selectedTab]}</div>
    </div>
  );
};

export const TabList = ({ children }) => (
  <div className="flex border-b border-gray-200">{children}</div>
);

export const Tab = ({ isSelected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium ${
      isSelected ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
    }`}
  >
    {children}
  </button>
);

export const TabPanel = ({ children }) => <div>{children}</div>;

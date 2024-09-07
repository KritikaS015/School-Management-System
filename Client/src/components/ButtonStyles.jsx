import React from "react";

export const RedButton = ({ children, ...props }) => (
  <button
    className="bg-red-600 text-white ml-1 p-2 hover:bg-red-500 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const BlackButton = ({ children, ...props }) => (
  <button
    className="bg-black text-white ml-1 hover:bg-gray-800 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const DarkRedButton = ({ children, ...props }) => (
  <button
    className="bg-red-800 text-white  hover:bg-red-600 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const BlueButton = ({ children, ...props }) => (
  <button
    className="bg-blue-900 p-2 rounded-sm  text-white hover:bg-blue-700 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const PurpleButton = ({ children, ...props }) => (
  <button
    className="bg-purple-900 text-white hover:bg-purple-700 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const LightPurpleButton = ({ children, ...props }) => (
  <button
    className="bg-purple-400 text-white hover:bg-purple-600 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const GreenButton = ({ children, ...props }) => (
  <button
    className="bg-green-800  text-white hover:bg-green-600 border-transparent p-1 rounded-lg"
    {...props}
  >
    {children}
  </button>
);

export const BrownButton = ({ children, ...props }) => (
  <button
    className="bg-stone-800 text-white hover:bg-stone-600 border-transparent"
    {...props}
  >
    {children}
  </button>
);

export const IndigoButton = ({ children, ...props }) => (
  <button
    className="bg-indigo-900 text-white hover:bg-indigo-700 border-transparent"
    {...props}
  >
    {children}
  </button>
);

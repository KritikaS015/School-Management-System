import React from "react";

const CircularProgress = ({ size = 24, color = "blue" }) => {
  const diameter = size;
  const strokeWidth = 4;
  const circleRadius = diameter / 2 - strokeWidth;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <svg
      className={`animate-spin text-${color}-500`}
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="text-transparent"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        cx={diameter / 2}
        cy={diameter / 2}
        r={circleRadius}
      />
      <circle
        className="text-transparent"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        cx={diameter / 2}
        cy={diameter / 2}
        r={circleRadius}
        strokeDasharray={circumference}
        strokeDashoffset={circumference / 4}
      />
    </svg>
  );
};

export default CircularProgress;

import React from "react";
import { FaChartBar } from "react-icons/fa"; // Optional, for displaying chart icon
import { Tooltip } from "react-tooltip"; // Ensure you have react-tooltip installed

const CustomBarChart = ({ chartData, dataKey }) => {
  const subjects = chartData.map((data) => data.subject);
  const distinctColors = generateDistinctColors(subjects.length);

  return (
    <div className="relative">
      <svg width="500" height="500" className="w-full h-full">
        {/* Add axis labels and other custom elements if needed */}
        {chartData.map((entry, index) => (
          <rect
            key={`bar-${index}`}
            x={index * 50} // Adjust based on your layout
            y={500 - entry[dataKey]} // Adjust based on your layout
            width={40}
            height={entry[dataKey]}
            fill={distinctColors[index]}
            className="transition-opacity duration-300 hover:opacity-75"
          />
        ))}
        {/* Tooltip for hover effect */}
        <Tooltip>
          <CustomTooltipContent dataKey={dataKey} />
        </Tooltip>
      </svg>
    </div>
  );
};

const CustomTooltipContent = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    const {
      subject,
      attendancePercentage,
      totalClasses,
      attendedClasses,
      marksObtained,
      subName,
    } = payload[0].payload;

    return (
      <div className="bg-white p-2 rounded shadow-md">
        {dataKey === "attendancePercentage" ? (
          <>
            <h2 className="text-lg font-bold">{subject}</h2>
            <p className="text-gray-700">
              Attended: ({attendedClasses}/{totalClasses})
            </p>
            <p className="text-gray-700">{attendancePercentage}%</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">{subName.subName}</h2>
            <p className="text-gray-700">Marks: {marksObtained}</p>
          </>
        )}
      </div>
    );
  }

  return null;
};

// Helper function to generate distinct colors
const generateDistinctColors = (count) => {
  const colors = [];
  const goldenRatioConjugate = 0.618033988749895;

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenRatioConjugate) % 1;
    const color = hslToRgb(hue, 0.6, 0.6);
    colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  }

  return colors;
};

// Helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export default CustomBarChart;

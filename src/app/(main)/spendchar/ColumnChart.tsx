"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu ví dụ cho biểu đồ Column
const columnData = [
  { month: "Tháng 1", totalIncome: 120 },
  { month: "Tháng 2", totalIncome: 230 },
  { month: "Tháng 3", totalIncome: 40 },
  { month: "Tháng 4", totalIncome: 550 },
  { month: "Tháng 5", totalIncome: 260 },
];

const ColumnChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        data={columnData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="totalIncome"
          fill="#ffc248"
          isAnimationActive={false} 
          radius={[10, 10, 0, 0]} // Tùy chỉnh các góc của cột (tuỳ chọn)
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChart;

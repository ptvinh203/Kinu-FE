"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";

// Dữ liệu ví dụ cho biểu đồ Donut
const pieData = [
  { name: "Danh mục 1", value: 400, color: "#8884d8" },
  { name: "Danh mục 2", value: 300, color: "#82ca9d" },
  { name: "Danh mục 3", value: 300, color: "#ffc107" },
  { name: "Danh mục 4", value: 200, color: "#ff7300" },
  { name: "Danh mục 5", value: 600, color: "#227ca3" },
  { name: "Danh mục 6", value: 300, color: "#ea00ff" },
  { name: "Danh mục 7", value: 10000, color: "#ff0815" },
];

const DonutChart: React.FC = () => {
  const totalValue = pieData.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="50%"
          outerRadius={210}  // Tăng kích thước vòng ngoài (lớn hơn)
          innerRadius={170}   // Tăng kích thước vòng trong (tạo Donut)
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          {/* Hiển thị tổng giá trị ở giữa biểu đồ */}
          <Label
            value={totalValue + " " + "VND"}
            position="center"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              fill: "#333",
            }}
          />
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical" // Chuyển legend theo chiều dọc
          align="right"     // Đặt legend bên phải
          verticalAlign="middle" // Căn giữa dọc
          wrapperStyle={{
            position: "absolute",      // Đặt vị trí tuyệt đối
            right: "200px",             // Đặt legend ở bên phải
            top: "30%",                // Căn giữa dọc
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;

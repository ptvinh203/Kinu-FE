"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  CartesianGrid as BarCartesianGrid,
  Tooltip as BarTooltip,
  XAxis as BarXAxis,
  YAxis as BarYAxis,
} from "recharts";

// Dữ liệu ví dụ cho biểu đồ Area
const data = [
  { day: 1, income: 140, expense: 100 },
  { day: 5, income: 60, expense: 120 },
  { day: 10, income: 180, expense: 150 },
  { day: 15, income: 55.59, expense: 140 },
  { day: 20, income: 250, expense: 170 },
  { day: 25, income: 140, expense: 180 },
  { day: 30, income: 180, expense: 160 },
];

// Dữ liệu cho PieChart (Donut) với 3 trường: danh mục, số lượng, màu sắc
const pieData = [
  { name: "Danh mục 1", value: 400, color: "#8884d8" },
  { name: "Danh mục 2", value: 300, color: "#82ca9d" },
  { name: "Danh mục 3", value: 300, color: "#ffc107" },
  { name: "Danh mục 4", value: 200, color: "#ff7300" },
];

// Dữ liệu cho biểu đồ Column (sửa lại chỉ có 2 trường: tháng và tổng số lương)
const columnData = [
  { month: "Tháng 1", totalIncome: 120 },
  { month: "Tháng 2", totalIncome: 130 },
  { month: "Tháng 3", totalIncome: 140 },
  { month: "Tháng 4", totalIncome: 150 },
  { month: "Tháng 5", totalIncome: 160 },
];

const AreaChartComponent: React.FC = () => {
  const [strokeWidthIncome, setStrokeWidthIncome] = useState(3);
  const [strokeWidthExpense, setStrokeWidthExpense] = useState(3);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null); // Trạng thái hover cho biểu đồ Donut
  const [highlightedBar, setHighlightedBar] = useState<string | null>(null); // Trạng thái hover cho biểu đồ Column

  // Custom Tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div>
          <p>{`Tháng ${payload[0].payload.day}`}</p>
          <p style={{ color: "#788a7f" }}>
            {`Tháng trước: ${payload[0].value}`}
          </p>
          <p style={{ color: "#ffc107" }}>
            {`Tháng hiện tại: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Xử lý hover trên PieChart (Donut)
  const handleDonutHover = (category: string) => {
    setHoveredCategory(category);
  };

  // Xử lý khi rời khỏi hover
  const handleDonutLeave = () => {
    setHoveredCategory(null);
  };

  // Xử lý hover trên Column
  const handleBarHover = (month: string) => {
    setHighlightedBar(month);
  };

  // Xử lý khi rời khỏi hover trên Column
  const handleBarLeave = () => {
    setHighlightedBar(null);
  };

  return (
    <div>
      {/* Biểu đồ Area (chiếm 100% chiều rộng và 50% chiều cao) */}
      <ResponsiveContainer width="100%" height="40%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Gradient cho tiền thu */}
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#74837a" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#717e76ee" stopOpacity={0} />
            </linearGradient>
            {/* Gradient cho tiền chi */}
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffc107" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#ffc107" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#788a7f"
            fill="url(#incomeGradient)"
            strokeWidth={strokeWidthIncome}
            onMouseEnter={() => setStrokeWidthIncome(4)}
            onMouseLeave={() => setStrokeWidthIncome(2)}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ffc107"
            fill="url(#expenseGradient)"
            strokeWidth={strokeWidthExpense}
            onMouseEnter={() => setStrokeWidthExpense(4)}
            onMouseLeave={() => setStrokeWidthExpense(2)}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Bố cục 2 biểu đồ (Donut và Column) chia 50% chiều cao mỗi cái */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "50%",
        }}
      >
        {/* Biểu đồ Donut */}
        <ResponsiveContainer width="48%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={70} // Tạo thành biểu đồ Donut
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  onMouseEnter={() => handleDonutHover(entry.name)}
                  onMouseLeave={handleDonutLeave}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {/* Biểu đồ Column với 2 mục là tháng và tổng số lương */}
        <ResponsiveContainer width="48%" height="100%">
          <BarChart
            data={columnData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            {columnData.map((entry) => (
              <Bar
                key={entry.month}
                dataKey="totalIncome"
                fill={highlightedBar === entry.month ? "#ff7300" : "#82ca9d"}
                onMouseEnter={() => handleBarHover(entry.month)}
                onMouseLeave={handleBarLeave}
                barSize={highlightedBar === entry.month ? 30 : 20} // In đậm khi hover
              />
            ))}
            <BarCartesianGrid strokeDasharray="3 3" />
            <BarXAxis dataKey="month" />
            <BarYAxis />
            <BarTooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartComponent;

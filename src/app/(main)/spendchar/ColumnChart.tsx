"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const ColumnChart: React.FC = () => {
  const [chartData, setChartData] = useState([]);

  const fetchExpenditure = async () => {
    try {
      // Initialize monthly data with all months set to 0
      const monthlyData: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      // Fetch data from API
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/expenditure?userId=${userId}`
      );
      const data = response.data.data;

      // Process data: group by month and sum values
      data.forEach((item: any) => {
        const month = parseInt(dayjs(item.dateSpinding).format("M"), 10); // Format to month number (1-12)
        const amount = parseFloat(item.amount);

        if (monthlyData[month] !== undefined) {
          monthlyData[month] += amount;
        }
      });

      // Convert object to array for chart consumption
      const processedData = Object.entries(monthlyData).map(([month, total]) => ({
        month: `Tháng ${month}`, // Add "Tháng" prefix for better readability
        totalIncome: total,
      }));

      setChartData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExpenditure();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        data={chartData}
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
          radius={[10, 10, 0, 0]} // Customize column corners
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChart;

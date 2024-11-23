"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";

// Interface for SpendType
interface SpendType {
  id: number;
  name: string;
  estimatedAmount: number;
  spent: number;
  spentAmount: number;
  color: {
    id: number;
    name: string;
    colorCode: string;
  };
  icon: {
    id: number;
    name: string;
    svgUrl: string;
  };
}

const DonutChart: React.FC = () => {
  const [spendTypes, setSpendTypes] = useState<SpendType[]>([]);

  // Function to calculate the total value of spentAmount
  const totalValue = spendTypes.reduce((acc, entry) => acc + entry.spentAmount, 0);

  const fetchSpendTypes = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/type-sprinding?userId=${userId}`
      );
      const data = response.data.data;

      // Process the fetched data
      const updatedData = data.map((item: any) => ({
        ...item,
        spent: 0, // Initialize spent to 0
      }));

      setSpendTypes(updatedData);
    } catch (error) {
      console.error("Error fetching spend types:", error);
    }
  };

  useEffect(() => {
    fetchSpendTypes();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {totalValue === 0 ? (
        <div className="text-center text-gray-500 text-xl font-semibold">
          Không có dữ liệu
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendTypes}
              dataKey="spentAmount"
              nameKey="name"
              cx="40%"
              cy="40%"
              outerRadius="70%" // Outer ring size
              innerRadius="50%" // Inner ring size (Donut effect)
              label
            >
              {spendTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color.colorCode} />
              ))}
              {/* Show the total value in the center */}
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
              layout="vertical" // Display the legend vertically
              align="right" // Align legend to the right
              verticalAlign="middle" // Vertically center the legend
              wrapperStyle={{
                position: "absolute",
                right: "100px",
                top: "20px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DonutChart;

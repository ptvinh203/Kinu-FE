"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";


const DonutChart: React.FC = () => {
  
  const [spendTypes, setSpendTypes] = useState([
    { id: 1, name: 'Tiền nhà', estimatedAmount: 3000000, spent: 3000000, spendAmount: 1000, color: { id: 1, name: "", colorCode: "" }, icon: { id: 1, name: "", svgUrl: "" } },
  ]);
  
  const totalValue = spendTypes.reduce((acc, entry) => acc + entry.spentAmount, 0);

  const fetchSpendTypes = async () => {
    try {
      // Fetch data from API
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type-sprinding?userId=${userId}`);
      console.log("API Response: ", response.data);  // Log the response data

      const data = response.data.data;
      const updatedData = data.map((item: any) => ({
        ...item,  // Spread the existing properties of the item
        spent: 0  // Initialize `spent` to 0 or any value you want
      }));
      console.log(updatedData)

      setSpendTypes(updatedData);  // Set the modified data to state
    } catch (error) {

    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpendTypes();
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%" className="flex justify-center items-center">
      <PieChart className="flex justify-center items-center">
        <Pie
          data={spendTypes}
          dataKey="spentAmount"
          nameKey="name"
          cx="40%"
          cy="40%"
          outerRadius="70%"  // Tăng kích thước vòng ngoài (lớn hơn)
          innerRadius="50%"   // Tăng kích thước vòng trong (tạo Donut)
          label
        >
          {spendTypes.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color.colorCode} />
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
            right: "100px",             // Đặt legend ở bên phải
            top: "20px",                // Căn giữa dọc
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;

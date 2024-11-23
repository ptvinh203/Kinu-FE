"use client";

import Image from "next/image";
import styles from "./spendchar.module.scss";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DonutChart from "./DonutChart"; // Import DonutChart
import ColumnChart from "./ColumnChart"; // Import ColumnChart
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";

const SpendChart: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dataByMonth, setDataByMonth] = useState<Record<string, any>>({});
  const [total, setTotal] = useState<number>(0); // Add state for total

  // Hàm để định dạng tháng và năm từ đối tượng Date
  const getMonthYear = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}-${year}`;
  };

  // Fetch data from API and transform it into dataByMonth
  const fetchExpenditure = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/expenditure?userId=${userId}`
      );
      const data = response.data.data;

      const groupedData: Record<string, any[]> = {};
      let totalAmount = 0;

      data.forEach((item: any) => {
        const monthYear = dayjs(item.dateSpinding).format("MM-YYYY");
        const currentMonth = dayjs(item.dateSpinding).month(); // Month index (0-11)
        const currentYear = dayjs(item.dateSpinding).year();
        const day = dayjs(item.dateSpinding).date();
        const amount = parseFloat(item.amount);

        totalAmount += amount; // Calculate the total amount

        // Determine the previous month and year
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle January (month 0)
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const previousMonthYear = `${(previousMonth + 1).toString().padStart(2, "0")}-${previousYear}`;

        // Initialize the month-year key if it doesn't exist
        if (!groupedData[monthYear]) {
          groupedData[monthYear] = [];
        }

        // Sum up all amounts for the previous month
        const lastMonthAmount = data
          .filter((entry: any) => {
            const entryMonth = dayjs(entry.dateSpinding).month();
            const entryYear = dayjs(entry.dateSpinding).year();
            return entryMonth === previousMonth && entryYear === previousYear;
          })
          .reduce((sum: number, entry: any) => sum + parseFloat(entry.amount), 0);

        // Push data for the specific day into the corresponding month-year group
        groupedData[monthYear].push({
          day,
          lastMonth: 0, // Sum of the previous month's amount
          currentMonth: amount,
        });
      });


      setTotal(totalAmount); // Update total state
      setDataByMonth(groupedData);
    } catch (error) {
      console.error("Error fetching expenditure data:", error);
    }
  };

  useEffect(() => {
    fetchExpenditure();
  }, []);

  // Dữ liệu cho biểu đồ Area, lọc theo tháng/năm đã chọn
  const selectedMonth = getMonthYear(selectedDate!);
  const data = dataByMonth[selectedMonth] || [];

  // Cập nhật khi người dùng chọn ngày mới
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const walletId = localStorage.getItem('walletId')

  return (
    <div className="flex w-full h-full p-0 space-x-10 tao-bg">
      {/* Sidebar Thêm loại chi tiêu */}
      <div className="w-[450px] p-5 pink-bg rounded-lg h-full flex flex-col justify-between">
        <div className="mb-3 p-2 bg-yellow-300 rounded-lg light-yellow-bg relative rounded-[20px] overflow-hidden">
          <Image
            className="absolute right-0 top-0 pl-[320px] h-[100%] min-h-[150px]"
            src="/icons/spendtype/decoration.svg"
            alt="decoration"
            width={430}
            height={500}
          />
          <div className="top-0 right-0 left-0 bottom-0 flex flex-col gap-2 px-4 py-4 z-[10]">
            <h2 className="text-[13px] font-semibold">SỐ DƯ TỪ VÍ ĐIỆN TỬ</h2>
            <div className="flex gap-5">
              <Image
                className=""
                src="/icons/spendtype/wallet.svg"
                alt="wallet"
                width={50}
                height={50}
              />
              <div>
                <p className={styles.money}>10.000.000 VND</p>
                <p className="text-sm font-md">Tổng chi phí</p>
              </div>
            </div>
            {
              walletId != null ?
                <div className="text-[13px] text-[#008080]">Đã liên kết ví điện tử</div>
                : <div></div>
            }
          </div>
        </div>
      </div>

      {/* Nội dung Biểu đồ */}
      <div className="flex-1">
        <div className={styles.areachart}>
          <div className="flex items-center justify-between mb-4 pr-8">
            {/* Thêm lịch chọn tháng và năm */}
            <div className="flex gap-4 ">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Thêm Biểu đồ Area */}
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {/* Gradient cho Tháng trước */}
                <linearGradient id="lastMonthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ece9f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ece9f1" stopOpacity={0} />
                </linearGradient>
                {/* Gradient cho Tháng sau */}
                <linearGradient id="currentMonthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffc248" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ffc248" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="lastMonth"
                name="Tháng trước"
                stroke="#c5bcd1"
                strokeWidth={5}
                fill="url(#lastMonthGradient)"
              />
              <Area
                type="monotone"
                dataKey="currentMonth"
                name="Tháng hiện tại"
                stroke="#ffc248"
                strokeWidth={5}
                fill="url(#currentMonthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Thêm các biểu đồ DonutChart và ColumnChart */}
        <div className={styles.container}>
          {/* DonutChart */}
          <div className={styles.donutChart}>
            <h3 className={styles.chartTitle}>Biểu đồ thống kê theo từng loại chi tiêu</h3>
            <DonutChart />
          </div>
          {/* ColumnChart */}
          <div className={styles.columnChart}>
            <h3 className={styles.chartTitle}>Tổng chi tiêu</h3>
            <p className={styles.chartMoney}>{total.toLocaleString("vi-VN")} VND</p>
            <ColumnChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendChart;

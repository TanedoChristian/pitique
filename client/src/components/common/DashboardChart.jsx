import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import api from "../../helper/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 20000,
      ticks: {
        stepSize: 5000,
        callback: function (value) {
          return value.toLocaleString();
        },
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DashboardChart = () => {
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/admins/revenue");
        const data = response.data;

        if (data && Array.isArray(data)) {
          // Map the data to month names
          const salesData = data.map((item) => ({
            monthName: new Date(item.month + "-01").toLocaleString("en-US", {
              month: "long",
            }),
            totalRevenue: item.total_revenue,
          }));

          // Create an array with zeros for each month
          const initialSalesData = Array(labels.length).fill(0);

          // Fill in actual values for existing months
          const filledSalesData = salesData.reduce(
            (acc, item) => {
              const monthIndex = labels.indexOf(item.monthName);

              if (monthIndex !== -1) {
                acc[monthIndex] = item.totalRevenue;
              }

              return acc;
            },
            [...initialSalesData]
          );

          setChartData({
            labels,
            datasets: [
              {
                fill: true,
                label: "Sales",
                data: filledSalesData,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (chartData === undefined)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return <Line options={options} data={chartData} />;
};

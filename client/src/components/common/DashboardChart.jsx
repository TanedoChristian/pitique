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
        const response = await api.get("/admins/revenue/all");
        const data = response.data;

        if (data && Array.isArray(data)) {
          const pkgDescList = ["photography", "amenities", "videography"];

          const datasets = pkgDescList.map((pkgDesc) => {
            const pkgData = data.map((item) => ({
              monthName: new Date(item.month + "-01").toLocaleString("en-US", {
                month: "long",
              }),
              totalRevenue: item[`${pkgDesc}_revenue`],
            }));

            const initialPkgData = Array(labels.length).fill(0);

            const filledPkgData = pkgData.reduce(
              (acc, item) => {
                const monthIndex = labels.indexOf(item.monthName);

                if (monthIndex !== -1) {
                  acc[monthIndex] = item.totalRevenue;
                }

                return acc;
              },
              [...initialPkgData]
            );

            let borderColor, backgroundColor;

            switch (pkgDesc) {
              case "photography":
                borderColor = "rgb(0, 255, 255)";
                backgroundColor = "rgba(0, 255, 255, 0.5)";
                break;
              case "amenities":
                borderColor = "rgb(0, 128, 0)";
                backgroundColor = "rgba(0, 128, 0, 0.5)";
                break;
              case "videography":
                borderColor = "rgb(255, 0, 0)";
                backgroundColor = "rgba(255, 0, 0, 0.5)";
                break;
              default:
                borderColor = "rgb(53, 162, 235)";
                backgroundColor = "rgba(53, 162, 235, 0.5)";
            }

            return {
              fill: true,
              label: pkgDesc.charAt(0).toUpperCase() + pkgDesc.slice(1),
              data: filledPkgData,
              borderColor,
              backgroundColor,
            };
          });

          setChartData({
            labels,
            datasets,
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

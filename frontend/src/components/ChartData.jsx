import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import Data from "./Data";

function ChartData({ ashu }) {
  const [chartData, setChartData] = useState([]);

  console.log(chartData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/country/search/${ashu}`
        );
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.log("error fetching chart data", error);
      }
    };
    fetchData();
  }, [ashu]);

  let data = {
    labels: [
      "active",
      "confiremed",
      "deaths",
      "newCases",
      "newDeaths",
      "newRecords",
      "recovered",
    ],
    datasets: [
      {
        label: chartData?.map((item) => `${item.country}'s Corona Chart`),
        data: [
          chartData?.map((item) => item.active),
          chartData?.map((item) => item.confirmed),
          chartData?.map((item) => item.deaths),
          chartData?.map((item) => item.newCases),
          chartData?.map((item) => item.newDeaths),
          chartData?.map((item) => item.newRecords),
          chartData?.map((item) => item.recovered),
        ],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* <h2>{`${chartData.country} Data Chart`}</h2> */}
      {/* <Line data={data} /> */}
      <br />
      <Bar data={data} />
      <br />
      {/* <Pie data={data} /> */}
      <br />
      {/* <Doughnut data={data} /> */}
    </div>
  );
}

export default ChartData;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ monthlyData }) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = {
    labels: monthlyData.map((monthData) => {
      return monthNames[monthData.month - 1]; 
    }),
    datasets: [
      {
        label: 'Donations',
        data: monthlyData.map(monthData => monthData.totalAmount), // Ensure data is mapped correctly
        backgroundColor: '#ec4f1d',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="my-4 w-[40%] h-[250px] flex flex-col gap-2 items-center justify-center">
      <Bar data={data} options={options} />
      <span className='font-semibold text-[14px]'>Monthly Donations</span>
    </div>
  );
};

export default BarChart;

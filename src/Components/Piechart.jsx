
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.tag),
    datasets: [
      {
        data: data.map(item => parseInt(item.totalDonations, 10)),
        backgroundColor: [
          '#fd5e2b', 
          '#fcba2e',  
          '#96fa2c',  
          '#64dcff ',
          '#f43d20',
         
        ],
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    cutout: '50%',  
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className='my-4 w-[40%] h-[250px] flex flex-col gap-2 items-center justify-center'>
    
      <Pie data={chartData} options={options} />
      <span className='font-semibold text-[14px]'>Categorywise Donations</span>
    </div>
  );
};

export default PieChart;

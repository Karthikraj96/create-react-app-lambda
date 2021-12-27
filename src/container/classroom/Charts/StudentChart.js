import React from 'react';
import { Bar, HorizontalBar, Line, Pie, Doughnut } from 'react-chartjs-2';
// import { customTooltips } from '../../../components/utilities/utilities';
// import { ChartContainer } from '../../container/dashboard/style';
const ChartJs = ({ props }) => {
  let height = 60;
  let labels = ['LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  let datasets = [
    {
      label: 'Boys',
      data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30, 5, 10],
      backgroundColor: '#001737',
    },
    {
      label: 'Girls',

      data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20.1, 12],
      backgroundColor: '#1ce1ac',
    },
  ];

  let options = {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,

          gridLines: {
            display: false,
            color: '#e5e9f2',
          },
          ticks: {
            beginAtZero: true,
            fontSize: 10,
            fontColor: '#182b49',
          },
        },
      ],
      xAxes: [
        {
          stacked: true,

          gridLines: {
            display: false,
          },
          barPercentage: 0.6,
          ticks: {
            beginAtZero: true,
            fontSize: 11,
            fontColor: '#182b49',
          },
        },
      ],
    },
  };
  const data = {
    datasets,
    labels,
  };
  return <Bar data={data} height={height} options={options} />;
};

//   ChartjsStackedChart.propTypes = {
//     height: PropTypes.number,
//     labels: PropTypes.arrayOf(PropTypes.string),
//     datasets: PropTypes.arrayOf(PropTypes.object),
//     options: PropTypes.object,
//   };

export default ChartJs;

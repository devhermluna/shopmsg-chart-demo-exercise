import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartHOC from '../HOC/ChartHOC';

const ChartData = (props) => {
  const { chart, switches } = props;

  const getDataArray = (arr, objectKey) => {
    return arr.reduce((accumulator, currentValue) => {
      return [...accumulator, currentValue[objectKey]];
    }, []);
  }

  return (
    <Line data={{
      datasets: [
        {
          label: 'Optins',
          fill: false,
          borderColor: '#43a0fe',
          backgroundColor: '#43a0fe',
          pointBorderColor: '#43a0fe',
          pointHoverBackgroundColor: '#43a0fe',
          pointHoverBorderColor: '#43a0fe',
          data: switches.optins ? getDataArray(chart.optins, 'count') : []
        },
        {
          label: 'Recipients',
          fill: false,
          borderColor: '#f52d3c',
          backgroundColor: '#f52d3c',
          pointBorderColor: '#f52d3c',
          pointHoverBackgroundColor: '#f52d3c',
          pointHoverBorderColor: '#f52d3c',
          data: switches.recipients ? getDataArray(chart.recipients, 'count') : []
        }
      ],
      labels: getDataArray(chart.optins, 'date')
    }} 
    options={{
      legend: {
        onClick: null,
        position: 'top'
      }
    }}
  />)
}


export default ChartHOC(ChartData);

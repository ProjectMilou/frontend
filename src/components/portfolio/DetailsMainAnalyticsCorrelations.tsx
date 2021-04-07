import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';

// TODO replace with actual api values
const mockCorrelations = [
  {
    name: 'BMW',
    data: [
      {
        x: 'Apple',
        y: 0.11,
      },
      {
        x: 'Mercedes',
        y: 0.9,
      },
    ],
  },
];

const Heatmat: React.FC = () => {
  const theme = useTheme();

  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#008FFB'],
    title: {
      text: 'HeatMap Chart (Single color)',
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: theme.palette.primary.contrastText,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.primary.contrastText,
        },
      },
    },
  };

  return (
    <Chart
      type="heatmap"
      height={350}
      series={mockCorrelations}
      options={options}
    />
  );
};

const DetailsMainAnalyticsCorrelations: React.FC = () => <Heatmat />;

export default DetailsMainAnalyticsCorrelations;

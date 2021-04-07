import React from 'react';
import Chart from 'react-apexcharts';

// TODO replace with props from api call
const mockCorrelations = [
  {
    name: 'BMW',
    data: [
      ['Daimler', 0.9],
      ['Audi', 0.8],
      ['Netto', 0.2],
      ['Apple', 0.3],
      ['HTC', 0.5],
      ['Razer', 0.4],
      ['McLaren', 0.8],
      ['Obi', 0.1],
      ['Burger King', 0.2],
    ],
  },
  {
    name: 'Daimler',
    data: [
      ['BMW', 0.9],
      ['Audi', 0.4],
      ['Netto', 0.7],
      ['Apple', 0.4],
      ['HTC', 0.5],
      ['Razer', 0.4],
      ['McLaren', 0.9],
      ['Obi', 0.2],
      ['Burger King', 0.5],
    ],
  },
  {
    name: 'Audi',
    data: [
      ['Daimler', 0.5],
      ['BMW', 0.8],
      ['Netto', 0.6],
      ['Apple', 0.3],
      ['HTC', 0.7],
      ['Razer', 0.2],
      ['McLaren', 0.8],
      ['Obi', 0.4],
      ['Burger King', 0.2],
    ],
  },
  {
    name: 'Netto',
    data: [
      ['Daimler', 0.2],
      ['Audi', 0.2],
      ['BMW', 0.2],
      ['Apple', 0.7],
      ['HTC', 0.8],
      ['Razer', 0.5],
      ['McLaren', 0.8],
      ['Obi', 0.6],
      ['Burger King', 0.8],
    ],
  },
  {
    name: 'Apple',
    data: [
      ['Daimler', 0.6],
      ['Audi', 0.9],
      ['Netto', 0.9],
      ['BMW', 0.6],
      ['HTC', 0.8],
      ['Razer', 0.2],
      ['McLaren', 0.4],
      ['Obi', 0.2],
      ['Burger King', 0.2],
    ],
  },
  {
    name: 'HTC',
    data: [
      ['Daimler', 0.9],
      ['Audi', 0.4],
      ['Netto', 0.3],
      ['Apple', 0.3],
      ['BMW', 0.3],
      ['Razer', 0.6],
      ['McLaren', 0.8],
      ['Obi', 0.9],
      ['Burger King', 0.1],
    ],
  },
  {
    name: 'Razer',
    data: [
      ['Daimler', 0.3],
      ['Audi', 0.1],
      ['Netto', 0.1],
      ['Apple', 0.2],
      ['HTC', 0.4],
      ['BMW', 0.2],
      ['McLaren', 0.2],
      ['Obi', 0.3],
      ['Burger King', 0.2],
    ],
  },
  {
    name: 'McLaren',
    data: [
      ['Daimler', 0.4],
      ['Audi', 0.5],
      ['Netto', 0.1],
      ['Apple', 0.6],
      ['HTC', 0.8],
      ['Razer', 0.3],
      ['BMW', 0.4],
      ['Obi', 0.1],
      ['Burger King', 0.2],
    ],
  },
  {
    name: 'Obi',
    data: [
      ['Daimler', 0.2],
      ['Audi', 0.8],
      ['Netto', 0.1],
      ['Apple', 0.1],
      ['HTC', 0.9],
      ['Razer', 0.9],
      ['McLaren', 0.9],
      ['BMW', 0.1],
      ['Burger King', 0.2],
    ],
  },
  {
    name: 'Burger King',
    data: [
      ['Daimler', 0.6],
      ['Audi', 0.6],
      ['Netto', 0.6],
      ['Apple', 0.3],
      ['HTC', 0.5],
      ['Razer', 0.4],
      ['McLaren', 0.8],
      ['Obi', 0.5],
      ['BMW', 0.5],
    ],
  },
];

const Heatmat: React.FC = () => {
  const series = mockCorrelations;

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
  };

  return (
    <Chart type="heatmap" height={350} series={series} options={options} />
  );
};

const DetailsMainAnalyticsCorrelations: React.FC = () => <Heatmat />;

export default DetailsMainAnalyticsCorrelations;

import React from 'react';
import Chart from 'react-apexcharts';

export type Series = {
  name: string;
  data: number[];
};

type KeyFiguresChartProps = {
  series: Series[];
  textColor: string;
  height: number;
};

const KeyFiguresChart: React.FC<KeyFiguresChartProps> = ({
  series,
  textColor,
  height,
}) => {
  const options = {
    legend: {
      labels: {
        colors: textColor,
      },
    },
    // Todo change hard coded colors and toggle for charts
    colors: ['#F6AE2D', '#5DE78E', '#4392F1', '#415176'],
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [2016, 2017, 2018, 2019, 2020],
      labels: {
        style: {
          colors: textColor,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: textColor,
        },
      },
    },
    markers: {
      size: 5,
    },
    stroke: {
      width: 2,
    },
  };
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        min-width="800px"
        height={height}
      />
    </div>
  );
};

export default KeyFiguresChart;

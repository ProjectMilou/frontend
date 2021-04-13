import React from 'react';
import Chart from 'react-apexcharts';

export type Series = {
  name: string;
  data: number[];
};

type KeyFiguresChartProps = {
  series: Series;
  years: number[];
  textColor: string;
  height: number;
};

const KeyFiguresChart: React.FC<KeyFiguresChartProps> = ({
  series,
  years,
  textColor,
  height,
}) => {
  const options = {
    // Todo change hard coded colors and toggle for charts
    colors: ['#F6AE2D'],
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: years,
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
        series={[series]}
        type="line"
        width="100%"
        min-width="800px"
        height={height}
      />
    </div>
  );
};

export default KeyFiguresChart;

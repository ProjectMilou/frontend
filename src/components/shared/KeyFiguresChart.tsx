import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';

export type Series = {
  name: string;
  data: number[];
};

type KeyFiguresChartProps = {
  series: Series;
  years: number[];
  dark?: boolean;
  height: number;
};

const KeyFiguresChart: React.FC<KeyFiguresChartProps> = ({
  series,
  years,
  dark,
  height,
}) => {
  const { palette } = useTheme();

  const color = dark
    ? palette.primary.contrastText
    : palette.secondary.contrastText;
  const options = {
    colors: [palette.teal.main],
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: years,
      labels: {
        style: {
          colors: color,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: color,
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

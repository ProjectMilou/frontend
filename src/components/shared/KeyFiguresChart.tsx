import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';
import { roundAxis } from '../../portfolio/Helper';

// Series type declaration
export type Series = {
  name: string;
  data: number[];
};
// KeyFiguresChart props type declaration
type KeyFiguresChartProps = {
  series: Series;
  years: number[];
  dark?: boolean;
  height: number;
};

/**
 * @param series - Data about the key figures (P/E, P/B, PEGR, EPS)
 * @param years - Years of the keyfigures data
 * @param dark - If one key figure is selected
 * @param height - Height of the chart
 * @return Key figures chart with selection
 */
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
    tooltip: {
      y: {
        formatter: (tooltipValue: number) => roundAxis(tooltipValue),
      },
    },
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
    noData: {
      text: 'Currently no Data available ;(',
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

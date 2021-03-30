import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';

type DetailsDonutProps = {
  portions: number[];
  names: string[];
  size: number;
  graphOffsetX: number;
  showLegendOnScale: boolean;
};

const DetailsDonut: React.FC<DetailsDonutProps> = ({
  portions,
  names,
  size,
  graphOffsetX,
  showLegendOnScale,
}) => {
  const theme = useTheme();

  const [state] = useState({
    series: portions,
    options: {
      labels: names,
      fill: {
        // TODO use theme colors
      },
      chart: {
        // redrawOnWindowResize: false,
        // redrawOnParentResize: false,
        offsetX: graphOffsetX,
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '18px',
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: theme.palette.primary.contrastText,
          useSeriesColors: false,
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
        itemMargin: {
          horizontal: 5,
          vertical: 5,
        },
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      // this scales the chart at certain break points to make
      // sure the chart stays visible at all screen sizes
      responsive: [
        {
          breakpoint: 10000,
          options: {
            chart: {
              height: size,
            },
            legend: {
              show: true,
              position: 'right',
            },
          },
        },
        {
          breakpoint: 1550,
          options: {
            chart: {
              height: size / 1.5,
            },
            legend: {
              show: true,
              position: 'right',
            },
          },
        },
        {
          breakpoint: 1100,
          options: {
            chart: {
              height: size / 1.5,
            },
            legend: {
              show: showLegendOnScale,
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <div style={{ alignSelf: 'center', width: '100%' }}>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height={size}
        width="100%"
      />
    </div>
  );
};

export default DetailsDonut;
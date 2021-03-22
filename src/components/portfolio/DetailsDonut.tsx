import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';

type DetailsDonutProps = {
  portions: number[];
  names: string[];
};

const DetailsDonut: React.FC<DetailsDonutProps> = ({ portions, names }) => {
  const theme = useTheme();

  const [state, setState] = useState({
    series: portions,
    options: {
      labels: names,
      fill: {
        // TODO use theme colors
      },
      chart: {
        redrawOnWindowResize: false,
        redrawOnParentResize: false,
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
        offsetX: 325,
        offsetY: 80,
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
    },
  });

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height={300}
        width="100%"
      />
    </div>
  );
};

export default DetailsDonut;

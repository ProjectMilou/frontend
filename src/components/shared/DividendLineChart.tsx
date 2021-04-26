import { useTheme } from '@material-ui/core';
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { roundAxis } from '../../portfolio/Helper';

type DividendLineChartProps = {
  series: Series[];
  height: number;
  textColor: string;
  year: number;
};

type Series = {
  name: string;
  data: number[];
};

const DividendLineChart: React.FC<DividendLineChartProps> = ({
  series,
  height,
  textColor,
  year,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  let seriesArr: Series[] = [];
  let noData = false;
  series[0].data.forEach((element) => {
    if (Number.isNaN(element)) {
      noData = true;
    }
  });
  series[1].data.forEach((element) => {
    if (Number.isNaN(element)) {
      noData = true;
    }
  });
  if (!noData) {
    seriesArr = series;
  }
  const options = {
    tooltip: {
      y: {
        formatter: (tooltipValue: number) => roundAxis(tooltipValue),
      },
    },
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: `${t('analyser.details.DividendsHistory')}`,
      align: 'center',
      style: {
        color: textColor,
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [year - 4, year - 3, year - 2, year - 1, year],
    xaxis: {
      type: 'year',
      labels: {
        style: {
          colors: textColor,
        },
      },
    },
    yaxis: [
      {
        title: {
          text: `${t('analyser.detail.dividend.payoutratio')}%`,
          style: {
            color: textColor,
          },
        },
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      {
        opposite: true,
        title: {
          text: `${t('analyser.detail.dividend.yield')}%`,
          style: {
            color: textColor,
          },
        },
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
    ],
    legend: {
      labels: {
        colors: textColor,
      },
    },
    noData: {
      text: 'No Data about Dividends is Found.',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: theme.palette.primary.dark,
        fontFamily: theme.typography.fontFamily,
        fontSize: '1.15rem',
        fontWeight: 600,
      },
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={seriesArr}
        type="line"
        width="100%"
        min-width="800px"
        height={height}
      />
    </div>
  );
};

export default DividendLineChart;

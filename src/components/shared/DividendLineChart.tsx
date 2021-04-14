import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

type DividendsChartProps = {
  series: Series[];
  height: number;
  textColor: string;
};

type Series = {
  name: string;
  data: number[];
};

const KeyFiguresChart: React.FC<DividendsChartProps> = ({
  series,
  height,
  textColor,
}) => {
  const { t } = useTranslation();

  const options = {
    // colors: ['#4392F1', '#F6AE2D'],
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
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
    labels: [2016, 2017, 2018, 2019, 2020],
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

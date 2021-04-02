import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

type KeyFiguresChartProps = {
  series: Series[];
};

type Series = {
  name: string;
  data: number[];
};

const KeyFiguresChart: React.FC<KeyFiguresChartProps> = ({ series }) => {
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
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    xaxis: {
      type: 'datetime',
      categories: [2016, 2017, 2018, 2019, 2020],
    },
    yaxis: [
      {
        title: {
          text: `${t('analyser.detail.dividend.payoutratio')}%`,
        },
      },
      {
        opposite: true,
        title: {
          text: `${t('analyser.detail.dividend.yield')}%`,
        },
      },
    ],
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        min-width="800px"
        height={350}
      />
    </div>
  );
};

export default KeyFiguresChart;

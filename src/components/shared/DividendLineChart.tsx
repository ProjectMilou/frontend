import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

type DividendLineChartProps = {
  series: Series[];
  height: number;
  textColor: string;
};

type Series = {
  name: string;
  data: number[];
};

const DividendLineChart: React.FC<DividendLineChartProps> = ({
  series,
  height,
  textColor,
}) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const options = {
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
    labels: [
      currentYear - 4,
      currentYear - 3,
      currentYear - 2,
      currentYear - 1,
      currentYear,
    ],
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

export default DividendLineChart;

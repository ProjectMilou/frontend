import { useTheme } from '@material-ui/core';
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { roundAxis } from '../../portfolio/Helper';

// DividendLineChart props type declaration
type DividendLineChartProps = {
  series: Series[];
  height: number;
  textColor: string;
  year: number;
};

// Series type declaration
export type Series = {
  name: string;
  data: number[];
  type: 'column' | 'line';
};

/**
 *
 *
 * @param series - Data includes dividend yields and dividend payout ratios in the last years.
 * @param  height - Height of the whole chart
 * @param textColor - Color of text in chart
 * @param  year - Latest year of the existing data
 * }
 * @return Dividend Line Chart
 */
const DividendLineChart: React.FC<DividendLineChartProps> = ({
  series,
  height,
  textColor,
  year,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [seriesArr, setSeriesArr] = React.useState<Series[]>([]);

  React.useEffect(() => {
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
      setSeriesArr(series);
    } else {
      setSeriesArr([]);
    }
  }, [series]);

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
      formatter: (tooltipValue: number) => roundAxis(tooltipValue),
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
          formatter: (tooltipValue: number) => roundAxis(tooltipValue),
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
          formatter: (tooltipValue: number) => roundAxis(tooltipValue),
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
      style: {
        color: theme.palette.primary.dark,
        fontFamily: theme.typography.fontFamily,
        fontSize: '1.15rem',
        fontWeight: 600,
      },
    },
    tooltip: {
      x: {
        show: false,
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (tooltipValue: number) => `${roundAxis(tooltipValue)}`,
        title: {
          formatter: (seriesName: string) => `${seriesName}:`,
        },
      },
      marker: {
        show: true,
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

import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  Correlations,
  NonEmptyPortfolioDetails,
} from '../../portfolio/APIClient';

type HeatMapSeries = {
  name: string;
  // the order of which number represents which company is always the same
  data: number[];
};

type HeatmapProps = {
  portfolio: NonEmptyPortfolioDetails;
  height: number;
};

function lookupCorrelation(
  symbol1: string,
  symbol2: string,
  correlations: Correlations
) {
  if (symbol1 === symbol2) return 1;
  return (
    // TODO in case the combination is not contained in correlations (faulty api data)
    //  proper error handling still needs to be done, right now 0 is returned
    correlations[`${symbol1};${symbol2}`] ||
    correlations[`${symbol2};${symbol1}`] ||
    0
  );
}

const DetailsAnalyticsHeatmap: React.FC<HeatmapProps> = ({
  portfolio,
  height,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { correlations } = portfolio.analytics;

  // categories for x-axis
  const chartCategories = Array.from(
    new Set(Object.keys(correlations).flatMap((key) => key.split(';')))
  ).sort();

  const series: HeatMapSeries[] = chartCategories.map((symbol1) => ({
    name: symbol1,
    data: chartCategories.map((symbol2) =>
      lookupCorrelation(symbol1, symbol2, correlations)
    ),
  }));

  const options = {
    legend: {
      onItemHover: {
        highlightDataSeries: false,
      },
      labels: {
        colors: theme.palette.primary.contrastText,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.8,
        // TODO sadly true does not work as expected, apex bug?
        reverseNegativeShade: false,
        colorScale: {
          ranges: [
            {
              from: -1,
              to: 0,
              color: theme.palette.error.main,
              name: t('portfolio.details.analytics.correlations.negative'),
            },
            {
              from: 0,
              to: 1,
              color: theme.palette.success.main,
              name: t('portfolio.details.analytics.correlations.positive'),
            },
          ],
        },
      },
    },
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: t('portfolio.details.analytics.correlations.chartTitle'),
      style: {
        color: theme.palette.primary.contrastText,
      },
    },
    xaxis: {
      categories: chartCategories,
      labels: {
        style: {
          colors: theme.palette.primary.contrastText,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.primary.contrastText,
        },
      },
    },
  };

  return (
    <Chart type="heatmap" height={height} series={series} options={options} />
  );
};

export default DetailsAnalyticsHeatmap;

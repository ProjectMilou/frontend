import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

type Correlations = {
  [key: string]: number;
};

type MappedCorrelation = [string, string, number];

type HeatMapSeries = {
  name: string;
  // the order of which number represents which company is always the same
  data: number[];
};

type HeatmapProps = {
  portfolio: NonEmptyPortfolioDetails;
  height: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Heatmap: React.FC<HeatmapProps> = ({ portfolio, height }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // TODO replace with correlations from props when api is available
  const correlations: Correlations = {
    'BMW;Apple': 1,
    'Apple;TUM': 2,
    'Apple;Faber': 3,
    'TUM;BMW': 4,
    'BMW;Faber': 5,
    'Faber;TUM': 6,
  };

  // array of arrays of symbol - symbol - correlation
  const mappedCorrelations: MappedCorrelation[] = Object.keys(
    correlations
  ).map((key) => [key.split(';')[0], key.split(';')[1], correlations[key]]);

  // gets unique set of companies displayed in the chart (used as x-axis categories)
  const chartCategories = Array.from(
    new Set(
      mappedCorrelations
        .map((mc) => [mc[0], mc[1]])
        .reduce((arr1, arr2) => arr1.concat(arr2))
        .sort()
    )
  );

  // will be passed to the chart as series prop
  const finalSeries: HeatMapSeries[] = [];

  chartCategories.forEach((c1) => {
    const currentSeries: HeatMapSeries = {
      name: c1,
      data: [],
    };
    chartCategories.forEach((c2) => {
      // the correlation of a company to itself is 1
      if (c1 === c2) currentSeries.data.push(1);
      else {
        /* check if c1 + c2 are present as a pair in the mappedCorrelations ignoring order
         if present push the corresponding correlation value, if no match is found place default value 0
         it is mandatory that each series has the same amount and order of ordered values to display a meaningful x-Axis in the chart */
        let valueToPush = 0;
        mappedCorrelations.forEach((mc) => {
          if (
            JSON.stringify([c1, c2].sort()) ===
            JSON.stringify(mc.slice(0, 2).sort())
          )
            // eslint-disable-next-line prefer-destructuring
            valueToPush = mc[2];
        });
        currentSeries.data.push(valueToPush);
      }
    });
    finalSeries.push(currentSeries);
  });

  const options = {
    chart: {
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: [theme.palette.lightBlue.main],
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
    <Chart
      type="heatmap"
      height={height}
      series={finalSeries}
      options={options}
    />
  );
};

type DetailsMainAnalyticsCorrelationsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

const DetailsMainAnalyticsCorrelations: React.FC<DetailsMainAnalyticsCorrelationsProps> = ({
  portfolio,
}) => <Heatmap portfolio={portfolio} height={350} />;

export default DetailsMainAnalyticsCorrelations;

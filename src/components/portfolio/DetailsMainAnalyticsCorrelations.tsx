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
  orderedValues: number[];
};

type HeatmapProps = {
  portfolio: NonEmptyPortfolioDetails;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Heatmap: React.FC<HeatmapProps> = ({ portfolio }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // TODO replace with correlations from props (rework of API client necessary
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
  const chartCategories = new Set(
    mappedCorrelations
      .map((mc) => [mc[0], mc[1]])
      .reduce((arr1, arr2) => arr1.concat(arr2))
      .sort()
  );

  // will be passed to the chart as series prop
  const finalSeries: HeatMapSeries[] = [];

  chartCategories.forEach((c1) => {
    const currentSeries: HeatMapSeries = {
      name: c1,
      orderedValues: [],
    };
    chartCategories.forEach((c2) => {
      // the correlation of a company to itself is 1
      if (c1 === c2) currentSeries.orderedValues.push(1);
      else {
        // check if c1 + c2 are present as a pair in the mappedCorrelations ignoring order
        // if present push the corresponding correlation value, if no match is found place default value 0
        // it is mandatory that each series has the same amount and order of ordered values to display a meaningful x-Axis in the cahrt
        let valueToPush = 0;
        mappedCorrelations.forEach((mc) => {
          if (
            JSON.stringify([c1, c2].sort()) ===
            JSON.stringify(mc.slice(0, 2).sort())
          )
            // eslint-disable-next-line prefer-destructuring
            valueToPush = mc[2];
        });
        currentSeries.orderedValues.push(valueToPush);
      }
    });
    finalSeries.push(currentSeries);
  });

  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#008FFB'],
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
    <Chart type="heatmap" height={350} series={finalSeries} options={options} />
  );
};

type DetailsMainAnalyticsCorrelationsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

const DetailsMainAnalyticsCorrelations: React.FC<DetailsMainAnalyticsCorrelationsProps> = ({
  portfolio,
}) => <Heatmap portfolio={portfolio} />;

export default DetailsMainAnalyticsCorrelations;

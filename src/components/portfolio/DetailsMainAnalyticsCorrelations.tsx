import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

type Correlation = {
  [key: string]: number;
};

type MappedCorrelation = [string, string, number];

type HeatMapMetric = {
  name: string;
  // the order of these correlation values are always the same, e.g. always BMW first, then Apple...
  orderedValues: number[];
};

const categories = [
  'BMW',
  'Apple',
  'J&J',
  'TUM',
  'Google',
  'Dell',
  'Nestle',
  'Android',
  'Faber',
  'TripAdvisor',
];

const mockCorr: Correlation = {
  'BMW;Apple': 0.397373186,
  'Apple;TUM': 0.352196405,
  'Faber;TUM': 0.57879282,
};

const mappedCorrs: MappedCorrelation[] = Object.keys(mockCorr).map((key) => [
  key.split(';')[0],
  key.split(';')[1],
  mockCorr[key],
]);

categories.forEach((c) => {
  const oneMetric: HeatMapMetric = {
    name: c,
    orderedValues: categories.map((c2) => {
      if (c2 === c) return 1;
      const matchingResults = mappedCorrs.filter(
        // check if c, c2 (current name and current key of the orderedValue) are the same two values as
        // in the ordered correlation received from backend => if yes the corresponding correlation value
        (mc) =>
          JSON.stringify([c, c2].sort()) ===
          JSON.stringify(mc.slice(0, 2).sort())
      );
      if (matchingResults.length === 1) return matchingResults[0];
      // in this case there was no match in the data from backend or more than one
      // TODO proper error handling
      return -1;
    }),
  };
});

// TODO replace with actual api values
const mockCorrelations = [
  {
    name: 'BMW',
    data: [
      {
        x: 'Apple',
        y: 0.11,
      },
      {
        x: 'Mercedes',
        y: 0.9,
      },
      {
        x: 'MCLaren',
        y: 0.6,
      },
    ],
  },
];

type HeatmapProps = {
  portfolio: NonEmptyPortfolioDetails;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Heatmap: React.FC<HeatmapProps> = ({ portfolio }) => {
  const theme = useTheme();
  const { t } = useTranslation();

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
      type: 'category',
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
      height={350}
      series={mockCorrelations}
      options={options}
    />
  );
};

type DetailsMainAnalyticsCorrelationsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

const DetailsMainAnalyticsCorrelations: React.FC<DetailsMainAnalyticsCorrelationsProps> = ({
  portfolio,
}) => <Heatmap portfolio={portfolio} />;

export default DetailsMainAnalyticsCorrelations;

import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

type Correlation = {
  [key: string]: number;
};

type MappedCorrelation = [string, string, number];

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

// neuerplan erstelle ein array von name, data objekten
// lege reihenfolge fest für data (da immer gleichen firmen damit auf x achse nichts schief geht
// iteriere durch mapped corrs durch und pushe in das array

// TODO replace with actual api values
const mockCorrelations = [
  {
    name: 'BMW',
    data: [1, 5, 6],
  },
  {
    name: 'Audi',
    data: [4, 5, 9],
  },
  {
    name: 'Mercedes',
    data: [3, 5, 9],
  },
];

const mockCategories = ['BMW', 'Audi', 'Mercedes'];

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
      categories: mockCategories,
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

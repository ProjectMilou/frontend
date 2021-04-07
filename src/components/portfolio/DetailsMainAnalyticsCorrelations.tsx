import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

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

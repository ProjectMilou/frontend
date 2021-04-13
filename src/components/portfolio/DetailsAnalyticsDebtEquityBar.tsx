import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

type DetailsAnalyticsDebtEquityBarProps = {
  portfolio: NonEmptyPortfolioDetails;
  height: number;
};

const DetailsAnalyticsDebtEquityBar: React.FC<DetailsAnalyticsDebtEquityBarProps> = ({
  portfolio,
  height,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const biggestTen = portfolio.positions
    .sort(
      (pos1, pos2) => pos2.qty * pos2.stock.price - pos1.qty * pos1.stock.price
    )
    .slice(0, 9);

  const series = [
    {
      name: t('portfolio.details.analytics.debtEquity'),
      data: biggestTen.map((pos) => pos.stock.debtEquity),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.lightBlue.main],
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: t('portfolio.details.analytics.debtEquity.title'),
      style: {
        color: theme.palette.primary.contrastText,
      },
    },
    xaxis: {
      categories: biggestTen.map((pos) => pos.stock.symbol),
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
    <>
      <Chart options={options} series={series} type="bar" height={height} />
    </>
  );
};

export default DetailsAnalyticsDebtEquityBar;

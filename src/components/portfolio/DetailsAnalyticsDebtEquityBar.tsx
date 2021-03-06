import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import { roundAxis } from '../../portfolio/Helper';

type DetailsAnalyticsDebtEquityBarProps = {
  portfolio: NonEmptyPortfolioDetails;
  height: number;
};

/**
 * Bar chart that displays the debt equity of the individual stocks and the portfolio average
 *
 * @param portfolio - Holds the positions and average
 * @param height - The height in px for the diagram to fill
 */
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
      data: biggestTen
        .map((pos) => pos.stock.debtEquity)
        .concat([portfolio.analytics.debtEquity]),
    },
  ];

  const options = {
    tooltip: {
      y: {
        formatter: (tooltipValue: number) => roundAxis(tooltipValue),
      },
    },
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
        horizontal: true,
      },
    },
    colors: Array(biggestTen.length)
      .fill(theme.palette.lightBlue.main, 0, biggestTen.length)
      .concat([theme.palette.secondary.light]),
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
      categories: biggestTen
        .map((pos) => pos.stock.symbol)
        .concat([t('portfolio.portfolioAverage')]),
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

  return <Chart options={options} series={series} type="bar" height={height} />;
};

export default DetailsAnalyticsDebtEquityBar;

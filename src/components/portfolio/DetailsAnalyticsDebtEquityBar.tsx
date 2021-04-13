import React from 'react';
import Chart from 'react-apexcharts';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

type DetailsAnalyticsDebtEquityBarProps = {
  portfolio: NonEmptyPortfolioDetails;
  height: number;
};

const DetailsAnalyticsDebtEquityBar: React.FC<DetailsAnalyticsDebtEquityBarProps> = ({
  portfolio,
  height,
}) => {
  const biggestTen = portfolio.positions
    .sort(
      (pos1, pos2) => pos2.qty * pos2.stock.price - pos1.qty * pos1.stock.price
    )
    .slice(0, 9);

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['alla'],
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={biggestTen.map((pos) => pos.stock)}
        type="bar"
        height={height}
      />
    </>
  );
};

export default DetailsAnalyticsDebtEquityBar;

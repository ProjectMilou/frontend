import React from 'react';
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';

// type DebtEquityProps = {
//   debtEquityPerStock: { id: symbol; de: number }[];
//   averageDebtEquity: number;
// };

const debtEquityPerStockExample = {
  AAPL: 3.957039440456695,
  GOOGL: 0.436192393414336,
  AMZN: 2.4387713588283155,
  IBM: 6.525015680030878,
  BABA: 0.5082281505442549,
  JPM: 11.121075767663967,
};

const averageDebtEquityExample = 8.48989362900556;

const DebtEquity: React.FC = () => {
  const series = [
    {
      data: [
        3.957039440456695,
        0.436192393414336,
        2.4387713588283155,
        6.525015680030878,
        0.5082281505442549,
        11.121075767663967,
      ],
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
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
      categories: ['AAPL', 'GOOGL', 'AMZN', 'IBM', 'BABA', 'JPM'],
    },
  };
  return (
    <>
      Debt to Equity Ratio
      <Chart
        options={options}
        series={series}
        // series={portions}
        type="bar"
        height={350}
        width="100%"
      />
      ;
    </>
  );
};

export default DebtEquity;

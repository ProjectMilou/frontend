import React from 'react';
import { render } from '@testing-library/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Dividends from './Dividends';
import {
  MockStockDividendTwo,
  MockCashFlowList,
  MockOverview,
  MockStockDividendThree,
} from '../../../analyser/APIMocks';
import { MockDetails } from '../../../portfolio/APIMocks';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    background: {
      default: '#EEF1FB',
    },
    primary: {
      light: '#415176',
      main: '#122654',
      dark: '#0c1a3a',
      contrastText: '#EEF1FB',
    },
    secondary: {
      light: '#df4f9b',
      main: '#D72483',
      dark: '#96195b',
      contrastText: '#000',
    },
    success: {
      main: '#50E2A8',
    },
    warning: {
      main: '#FFC43B',
    },
    error: {
      main: '#D64745',
    },
    lightBlue: {
      main: '#3FBCF2',
    },
    teal: {
      main: '#34CFB2',
    },
  },
});

// Test props type declaration
type Test = {
  pass: boolean;
  category: string;
  passText: string;
  failText: string;
};

test('Shows pass texts for dividends', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Dividends
        series={MockStockDividendTwo}
        cashFlowList={MockCashFlowList}
      />
    </ThemeProvider>
  );

  const dividendYield = MockStockDividendTwo[MockStockDividendTwo.length - 1];
  
  const lastAnnualReports = MockCashFlowList.annualReports[MockCashFlowList.annualReports.length - 1];

  const dividendPayoutRatio =
  Math.round(
    (lastAnnualReports.dividendPayout / lastAnnualReports.netIncome) * 100
  ) / 100;

  const hasDividend: Test = {
    pass: dividendYield > 0,
    category: 'Dividend',
    passText: 'A dividend is paid',
    failText: 'No dividend is paid',
  };

  const aboveAverage: Test = {
    pass: dividendYield > 0.025,
    category: 'High Dividend',
    passText: 'Dividend is above average of 2.5%',
    failText: 'Dividend is below average of 2.5%',
  };

  const goodPayoutRatio: Test = {
    pass: dividendPayoutRatio > 0 && dividendPayoutRatio < 0.5,
    category: 'analyser.details.DividendPayoutRatio',
    passText: 'A good payout ratio is below 50%',
    failText:
      'The company is making loss and does not provide a good payout ratio',
  };

  expect(hasDividend.passText).toBeInTheDocument;
  expect(aboveAverage.passText).toBeInTheDocument;
  expect(goodPayoutRatio.passText).toBeInTheDocument;
});

test('Shows fail texts for dividends', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Dividends
        series={MockStockDividendThree}
        cashFlowList={MockCashFlowList}
      />
    </ThemeProvider>
  );

  const dividendYield = MockStockDividendThree[MockStockDividendThree.length - 1];
  
  const lastAnnualReports = MockCashFlowList.annualReports[MockCashFlowList.annualReports.length - 1];

  const dividendPayoutRatio = 0.25;

  const hasDividend: Test = {
    pass: dividendYield > 0,
    category: 'Dividend',
    passText: 'A dividend is paid',
    failText: 'No dividend is paid',
  };

  const aboveAverage: Test = {
    pass: dividendYield > 0.025,
    category: 'High Dividend',
    passText: 'Dividend is above average of 2.5%',
    failText: 'Dividend is below average of 2.5%',
  };

  const goodPayoutRatio: Test = {
    pass: dividendPayoutRatio > 0 && dividendPayoutRatio < 0.5,
    category: 'analyser.details.DividendPayoutRatio',
    passText: 'A good payout ratio is below 50%',
    failText:
      'The company is making loss and does not provide a good payout ratio',
  };

  expect(hasDividend.failText).toBeInTheDocument;
  expect(aboveAverage.failText).toBeInTheDocument;
  expect(goodPayoutRatio.failText).toBeInTheDocument;
});

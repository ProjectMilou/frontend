import React from 'react';
import { render } from '@testing-library/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Dividends from './Dividends';
import {
  MockStockDividendTwo,
  MockCashFlowList,
  MockStockDividendThree,
} from '../../../analyser/APIMocks';

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

const dividendYield = 0.1;
const dividendPayoutRatio = 0.3;

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

describe('Dividends', () => {
  test('Shows pass texts for dividends', async () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <Dividends
          series={MockStockDividendTwo}
          cashFlowList={MockCashFlowList}
          dividendYield={0.1}
          dividendPayoutRatio={0.3}
          nextPayout={new Date('2021-03-10')}
        />
      </ThemeProvider>
    );
    expect(queryByText(hasDividend.passText)).toBeInTheDocument();
    expect(queryByText(aboveAverage.passText)).toBeInTheDocument();
    expect(queryByText(goodPayoutRatio.passText)).toBeInTheDocument();
  });

  test('Shows fail texts for dividends', async () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <Dividends
          series={MockStockDividendThree}
          cashFlowList={MockCashFlowList}
          dividendYield={0.0}
          dividendPayoutRatio={0.5}
          nextPayout={new Date('2021-03-10')}
        />
      </ThemeProvider>
    );
    expect(queryByText(hasDividend.failText)).toBeInTheDocument();
    expect(queryByText(aboveAverage.failText)).toBeNull();
    expect(queryByText(goodPayoutRatio.failText)).toBeNull();
  });
});

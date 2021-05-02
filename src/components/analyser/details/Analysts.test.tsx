import React from 'react';
import { render } from '@testing-library/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Analysts from './Analysts';
import {
  MockOverview,
  MockAnalystsRecommendation,
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

const renderComponent = () => ({
  ...render(
    <ThemeProvider theme={theme}>
      <Analysts
        recommendations={MockAnalystsRecommendation}
        overview={MockOverview}
      />
    </ThemeProvider>
  ),
});

test('Shows Analysts componants', async () => {
  const { queryByText } = renderComponent();
  expect(queryByText('analyser.details.analystsHeader')).toBeInTheDocument();
  expect(queryByText('analyser.details.analysts.target')).toBeInTheDocument();
});

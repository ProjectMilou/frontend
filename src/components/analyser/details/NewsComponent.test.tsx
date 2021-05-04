import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import NewsComponent from './NewsComponent';
import { MockNewsList } from '../../../analyser/APIMocks';

jest.mock('../../../analyser/APIClient');

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

describe('NewsComponent', () => {
  test('shows mock news', async () => {
    render(
      <ThemeProvider theme={theme}>
        <NewsComponent newsList={MockNewsList} />
      </ThemeProvider>
    );

    const mockHeadlineMaxLength = 80;
    screen.getAllByText(
      MockNewsList.news[0].headline.substring(0, mockHeadlineMaxLength),
      { exact: false }
    );
    screen.getAllByText(
      MockNewsList.news[1].headline.substring(0, mockHeadlineMaxLength),
      { exact: false }
    );
    screen.getAllByText(
      MockNewsList.news[2].headline.substring(0, mockHeadlineMaxLength),
      { exact: false }
    );
  });
});

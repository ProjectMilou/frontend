import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import DetailsHeader from './DetailsHeader';
import { MockOverview } from '../../../analyser/APIMocks';

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
      <DetailsHeader stock={MockOverview} back={jest.fn()} />
    </ThemeProvider>
  ),
});

test('Details header renders correctly', async () => {
  const { queryByText } = renderComponent();
  expect(queryByText(MockOverview.symbol)).toBeInTheDocument();

  // testing back button
  const backButton = screen.getByRole('button', { name: 'back' });
  await userEvent.click(backButton);

  // expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
});

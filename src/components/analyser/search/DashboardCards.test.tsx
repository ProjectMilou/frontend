import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import DashboardCards, { DashboardCardsProps } from './DashboardCards';
import { MockOverview, MockOverviewTwo } from '../../../analyser/APIMocks';

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

describe('DashboardCards', () => {
  const defaultProps: DashboardCardsProps = {
    stocks: [MockOverview, MockOverviewTwo],
  };

  const renderComponent = (newProps?: Partial<DashboardCardsProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(
        <ThemeProvider theme={theme}>
          <DashboardCards {...props} />
        </ThemeProvider>
      ),
      props,
    };
  };

  test('show empty Cards if no stocks exist', () => {
    const { container, queryByText } = renderComponent({ stocks: [] });
    // empty Cards & no error message & no table content
    expect(queryByText('analyser.dashboard.errorMessage')).toBeNull();
    expect(container.querySelector('table')).toBeNull();
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  test('display stock information', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('select stock on click', () => {
    const { props, getByText, queryByText } = renderComponent();
    fireEvent.click(getByText(props.stocks[0].symbol));
    expect(queryByText(props.stocks[0].symbol)).toBeInTheDocument();
    fireEvent.click(getByText(props.stocks[1].symbol));
    expect(queryByText(props.stocks[1].symbol)).toBeInTheDocument();
  });
});

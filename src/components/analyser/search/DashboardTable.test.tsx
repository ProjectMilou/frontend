import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import DashboardTable, { DashboardTableProps } from './DashboardTable';
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

describe('DashboardTable', () => {
  const defaultProps: DashboardTableProps = {
    stocks: [MockOverview, MockOverviewTwo],
  };

  const renderComponent = (newProps?: Partial<DashboardTableProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(
        <ThemeProvider theme={theme}>
          <DashboardTable {...props} />
        </ThemeProvider>
      ),
      props,
    };
  };

  test('show empty table if no stocks exist', () => {
    const { container, queryByText } = renderComponent({ stocks: [] });
    // empty table & no error message
    expect(queryByText('analyser.dashboard.errorMessage')).toBeNull();
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('ul')).toBeNull();
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

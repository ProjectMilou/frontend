import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import * as API from '../../../analyser/APIClient';
import Dashboard, { DashboardProps } from './Dashboard';
import { MockOverview } from '../../../analyser/APIMocks';
import { AppError } from '../../../Errors';

jest.mock('../../../analyser/APIClient');
const mockAPI = API as jest.Mocked<typeof API>;

export const theme = createMuiTheme({
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

describe('Dashboard', () => {
  const defaultProps: DashboardProps = {
    token: 'validToken',
  };

  const renderComponent = (newProps?: Partial<DashboardProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(
        <ThemeProvider theme={theme}>
          <Dashboard {...props} />
        </ThemeProvider>
      ),
      props,
    };
  };

  test('shows loading indicator', async () => {
    // keep loading forever
    mockAPI.listStocks.mockImplementation(async () => new Promise(() => {}));
    const { container, queryByText } = renderComponent();

    // only the loading indeicator should be visible
    expect(queryByText('analyser.dashboard.title')).toBeNull();
    expect(container.querySelector('.MuiLinearProgress-bar')).not.toBeNull();
  });

  test('shows stocks', async () => {
    const mockStockOverview = mockAPI.listStocks.mockResolvedValue([
      MockOverview,
    ]);    
    const { container, queryByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockStockOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the Stock overview should be visible
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText(MockOverview.symbol)).toBeInTheDocument();
  });

  test('shows error message and loads stocks again on retry', async () => {
    let mockStockOverview = mockAPI.listStocks.mockRejectedValue(
      new AppError('UNKNOWN')
    );
    const { container, queryByText, getByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockStockOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the error message should be visible
    // expect(queryByText('analyser.dashboard.title')).toBeNull();
    expect(queryByText('analyser.dashboard.title')).not.toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText('error.message.UNKNOWN')).toBeInTheDocument();

    // click retry
    mockStockOverview = mockAPI.listStocks.mockResolvedValue([
      MockOverview,
    ]);
    fireEvent.click(getByText('error.action.retry'));
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockStockOverview).toHaveBeenCalledTimes(2);
      });
    });

    // the stock overview should be visible
    expect(queryByText('error.message.UNKNOWN')).toBeNull();
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText(MockOverview.name)).toBeInTheDocument();
  });

});

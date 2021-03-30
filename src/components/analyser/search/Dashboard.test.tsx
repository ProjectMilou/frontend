import {
  render,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import * as API from '../../../analyser/APIClient';
import Dashboard, { DashboardProps } from './Dashboard';
import { MockOverview, MockOverviewTwo } from '../../../analyser/APIMocks';

jest.mock('../../../analyser/APIClient');
const mockAPI = API as jest.Mocked<typeof API>;

describe('Dashboard', () => {
  const defaultProps: DashboardProps = {
    token: 'validToken',
    selectStock: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DashboardProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<Dashboard {...props} />),
      props,
    };
  };

  test('shows loading indicator', async () => {
    // keep loading forever
    mockAPI.listStocks.mockImplementation(async () => new Promise(() => {}));
    const { queryByText } = renderComponent();

    // only the loading indeicator should be visible
    expect(queryByText('analyser.dashboard.title')).toBeNull();
  });

  test('shows stocks', async () => {
    const mockStockOverview = mockAPI.listStocks.mockResolvedValue([
      MockOverview,
      MockOverviewTwo,
    ]);
    const { queryByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockStockOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the Stock overview should be visible
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    // todo
    // expect(queryByText(MockOverview.symbol)).toBeInTheDocument();
    // expect(queryByText(MockOverviewTwo.symbol)).toBeInTheDocument();
  });

  test('shows error message and loads Stocks again on retry', async () => {
    let mockStockOverview = mockAPI.listStocks.mockRejectedValue(
      new Error('UNKNOWN')
    );
    const { container, queryByText, getByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockStockOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the error message should be visible
    expect(queryByText('analyser.dashboard.title')).not.toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText('error.message.UNKNOWN')).toBeInTheDocument();

    // click retry
    mockStockOverview = mockAPI.listStocks.mockResolvedValue([
      MockOverview,
      MockOverviewTwo,
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
    // todo
    // expect(queryByText(MockOverview.symbol)).toBeInTheDocument();
    // expect(queryByText(MockOverviewTwo.symbol)).toBeInTheDocument();
  });
});

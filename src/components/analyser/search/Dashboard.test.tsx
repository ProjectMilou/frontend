import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import * as API from '../../../analyser/APIClient';
import Dashboard, { DashboardProps } from './Dashboard';
import { MockOverview } from '../../../analyser/APIMocks';

jest.mock('../../../analyser/APIClient');
const mockAPI = API as jest.Mocked<typeof API>;

describe('Dashboard', () => {
  const defaultProps: DashboardProps = {
    token: 'validToken',
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
    const { container, queryByText } = renderComponent();

    // only the loading indeicator should be visible
    expect(queryByText('analyser.dashboard.title')).toBeNull();
    expect(container.querySelector('.MuiLinearProgress-bar')).not.toBeNull();
  });

  test('shows stocks', async () => {
    const mockStockOverview = mockAPI.listStocks.mockResolvedValue([
      MockOverview,
    ]);
    console.log(mockStockOverview.length);
    
    const { container, queryByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockStockOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the Stock overview should be visible
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
  });
});

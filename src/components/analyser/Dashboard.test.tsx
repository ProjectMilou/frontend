import { render, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import * as API from '../../portfolio/APIClient';
import Dashboard, { DashboardProps } from './Dashboard';

jest.mock('../../portfolio/APIClient');
const mockAPI = API as jest.Mocked<typeof API>;

describe('Dashboard', () => {
  const defaultProps: DashboardProps = {
    token: 'validToken',
    selectPortfolio: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DashboardProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<Dashboard {...props} />),
      props,
    };
  };

  test('shows portfolios', async () => {
    const mockPortfolioOverview = mockAPI.portfolioOverview.mockResolvedValue([
      API.MockOverview,
      API.MockOverviewTwo,
    ]);
    const { container, queryByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockPortfolioOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the portfolio overview should be visible
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText(API.MockOverview.name)).toBeInTheDocument();
    expect(queryByText(API.MockOverviewTwo.name)).toBeInTheDocument();
  });

  test('shows error message and loads portfolios again on retry', async () => {
    let mockPortfolioOverview = mockAPI.portfolioOverview.mockRejectedValue(
      new Error('UNKNOWN')
    );
    const { container, queryByText, getByText } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockPortfolioOverview).toHaveBeenCalledTimes(1);
      });
    });

    // the error message should be visible
    expect(queryByText('analyser.dashboard.title')).not.toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText('error.message.UNKNOWN')).toBeInTheDocument();

    // click retry
    mockPortfolioOverview = mockAPI.portfolioOverview.mockResolvedValue([
      API.MockOverview,
      API.MockOverviewTwo,
    ]);
    fireEvent.click(getByText('error.action.retry'));
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockPortfolioOverview).toHaveBeenCalledTimes(2);
      });
    });

    // the portfolio overview should be visible
    expect(queryByText('error.message.UNKNOWN')).toBeNull();
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText(API.MockOverview.name)).toBeInTheDocument();
    expect(queryByText(API.MockOverviewTwo.name)).toBeInTheDocument();
  });
});

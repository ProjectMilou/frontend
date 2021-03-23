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

  test('shows loading indicator', async () => {
    // keep loading forever
    mockAPI.portfolioOverview.mockImplementation(
      async () => new Promise(() => {})
    );
    const { container, queryByText } = renderComponent();

    // only the loading indeicator should be visible
    expect(queryByText('portfolio.dashboard.title')).toBeNull();
    expect(container.querySelector('.MuiLinearProgress-bar')).not.toBeNull();
    expect(queryByText('portfolio.dashboard.createPortfolio')).toBeNull();
  });

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
    expect(queryByText('portfolio.dashboard.title')).toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText(API.MockOverview.name)).toBeInTheDocument();
    expect(queryByText(API.MockOverviewTwo.name)).toBeInTheDocument();
    expect(queryByText('portfolio.dashboard.createPortfolio')).not.toBeNull();
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
    expect(queryByText('portfolio.dashboard.title')).not.toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText('portfolio.dashboard.createPortfolio')).toBeNull();
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
    expect(queryByText('portfolio.dashboard.title')).toBeInTheDocument();
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();
    expect(queryByText(API.MockOverview.name)).toBeInTheDocument();
    expect(queryByText(API.MockOverviewTwo.name)).toBeInTheDocument();
    expect(queryByText('portfolio.dashboard.createPortfolio')).not.toBeNull();
  });
});

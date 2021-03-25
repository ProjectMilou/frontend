import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import * as API from '../../portfolio/APIClient';
import Dashboard, { DashboardProps } from './Dashboard';
import { MockOverview, MockOverviewTwo } from '../../portfolio/APIMocks';

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
    mockAPI.list.mockImplementation(async () => new Promise(() => {}));
    const { container, queryByText } = renderComponent();

    // only the loading indeicator should be visible
    expect(queryByText('portfolio.dashboard.title')).toBeNull();
    expect(container.querySelector('.MuiLinearProgress-bar')).not.toBeNull();
    expect(queryByText('portfolio.dashboard.createPortfolio')).toBeNull();
  });

  test('shows portfolios', async () => {
    const mockPortfolioOverview = mockAPI.list.mockResolvedValue([
      MockOverview,
      MockOverviewTwo,
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
    expect(queryByText(MockOverview.name)).toBeInTheDocument();
    expect(queryByText(MockOverviewTwo.name)).toBeInTheDocument();
    expect(queryByText('portfolio.dashboard.createPortfolio')).not.toBeNull();
  });

  test('shows error message and loads portfolios again on retry', async () => {
    let mockPortfolioOverview = mockAPI.list.mockRejectedValue(
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
    mockPortfolioOverview = mockAPI.list.mockResolvedValue([
      MockOverview,
      MockOverviewTwo,
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
    expect(queryByText(MockOverview.name)).toBeInTheDocument();
    expect(queryByText(MockOverviewTwo.name)).toBeInTheDocument();
    expect(queryByText('portfolio.dashboard.createPortfolio')).not.toBeNull();
  });

  test('rename popup renames the portfolio', async () => {
    const mockPortfolioOverview = mockAPI.list.mockResolvedValue([
      MockOverview,
      MockOverviewTwo,
    ]);
    mockAPI.rename.mockResolvedValue();
    const { container } = renderComponent();
    await act(async () => {
      // wait until the component is rendered
      await waitFor(() => {
        expect(mockPortfolioOverview).toHaveBeenCalledTimes(1);
      });
    });

    // no popup visible yet
    expect(screen.queryByText('portfolio.dialog.rename.title')).toBeNull();

    // popup opens on click and shows the correct name
    fireEvent.click(container.querySelectorAll('button svg')[2]);
    expect(
      screen.queryByText('portfolio.dialog.rename.title')
    ).toBeInTheDocument();
    expect(document.querySelector('input')).toHaveValue(MockOverview.name);

    // rename the portfolio and close the popup
    fireEvent.change(document.querySelector('input')!, {
      target: { value: 'new name' },
    });
    fireEvent.click(screen.getByText('portfolio.rename'));
    await waitFor(() => {
      expect(screen.queryByText('portfolio.dialog.rename.title')).toBeNull();
    });
    expect(screen.queryByText(MockOverview.name)).toBeNull();
    expect(screen.queryByText('new name')).toBeInTheDocument();

    // popup shows the correct name for a different portfolio
    // popup opens on click and shows the correct name
    fireEvent.click(container.querySelectorAll('button svg')[5]);
    expect(
      screen.queryByText('portfolio.dialog.rename.title')
    ).toBeInTheDocument();
    expect(document.querySelector('input')).toHaveValue(MockOverviewTwo.name);
  });
});

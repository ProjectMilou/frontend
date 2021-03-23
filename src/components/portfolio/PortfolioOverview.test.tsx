import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import PortfolioOverview, { PortfolioOverviewProps } from './PortfolioOverview';
import { MockOverview, MockOverviewTwo } from '../../portfolio/APIClient';

jest.mock('./DashboardTable', () => () => <table />);

describe('PortfolioOverview', () => {
  const defaultProps: PortfolioOverviewProps = {
    portfolios: [MockOverview, MockOverviewTwo],
    selectPortfolio: jest.fn(),
    renamePortfolio: jest.fn(),
    duplicatePortfolio: jest.fn(),
    deletePortfolio: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<PortfolioOverviewProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<PortfolioOverview {...props} />),
      props,
    };
  };

  test('show message if no portfolios exist', () => {
    const { container, getByText } = renderComponent({ portfolios: [] });
    expect(getByText('portfolio.dashboard.title')).toBeInTheDocument();
    expect(getByText('portfolio.dashboard.noPortfolios')).toBeInTheDocument();
    // no table
    expect(container.querySelector('table')).toBeNull();
    // no view selection
    expect(container.querySelectorAll('button svg')).toHaveLength(0);
  });

  test('switch between table and cards view', () => {
    // TODO: Update test once cards view is implemented
    const { container, queryByText } = renderComponent();
    expect(queryByText('portfolio.dashboard.title')).toBeInTheDocument();
    expect(queryByText('portfolio.dashboard.noPortfolios')).toBeNull();
    expect(queryByText('cards')).toBeNull();
    expect(container.querySelectorAll('table')).toHaveLength(1);
    // buttons to change view
    const buttons = container.querySelectorAll('button svg');
    expect(buttons).toHaveLength(2);
    // change to cards view
    fireEvent.click(buttons[1]);
    expect(container.querySelectorAll('table')).toHaveLength(0);
    expect(queryByText('cards')).toBeInTheDocument();
    // change to table view
    fireEvent.click(buttons[0]);
    expect(container.querySelectorAll('table')).toHaveLength(1);
    expect(queryByText('cards')).toBeNull();
  });
});

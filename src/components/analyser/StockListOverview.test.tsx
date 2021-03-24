import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import StockListOverview, { StockListOverviewProps } from './StockListOverview';
import { MockOverview, MockOverviewTwo } from '../../portfolio/APIClient';

jest.mock('./DashboardTable', () => () => <table />);

describe('StockListOverview', () => {
  const defaultProps: StockListOverviewProps = {
    portfolios: [MockOverview, MockOverviewTwo],
    selectPortfolio: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<StockListOverviewProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<StockListOverview {...props} />),
      props,
    };
  };

  test('show message if no portfolios exist', () => {
    const { container, getByText } = renderComponent({ portfolios: [] });
    expect(getByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(getByText('analyser.dashboard.noPortfolios')).toBeInTheDocument();
    // no table
    expect(container.querySelector('table')).toBeNull();
    // no view selection
    expect(container.querySelectorAll('button svg')).toHaveLength(0);
  });

  test('switch between table and cards view', () => {
    // TODO: Update test once cards view is implemented
    const { container, queryByText } = renderComponent();
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(queryByText('analyser.dashboard.noPortfolios')).toBeNull();
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

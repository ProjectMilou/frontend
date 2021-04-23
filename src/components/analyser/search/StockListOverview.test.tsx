import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import StockListOverview, { StockListOverviewProps } from './StockListOverview';
import MockOverview from '../../../analyser/APIMocks';

jest.mock('./DashboardTable', () => () => <table />);
jest.mock('./DashboardCards', () => () => <ul />);

describe('PortfolioOverview', () => {
  const defaultProps: StockListOverviewProps = {
    stocks: [MockOverview],
  };

  const renderComponent = (newProps?: Partial<StockListOverviewProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<StockListOverview {...props} />),
      props,
    };
  };

  test('show message if no stocks exist', () => {
    const { container, getByText } = renderComponent({ stocks: [] });
    expect(getByText('analyser.dashboard.noStocks')).toBeInTheDocument();
    // view selection
    expect(container.querySelectorAll('button svg')).toHaveLength(0);
  });

  test('switch between table and cards view', () => {
    const { container, queryByText } = renderComponent();
    expect(queryByText('analyser.dashboard.title')).toBeInTheDocument();
    expect(queryByText('analyser.dashboard.noStocks')).toBeNull();
    expect(container.querySelectorAll('table')).toHaveLength(1);
    expect(container.querySelectorAll('ul')).toHaveLength(0);
    // buttons to change view
    const buttons = container.querySelectorAll('button svg');
    expect(buttons).toHaveLength(2);
    // change to cards view
    fireEvent.click(buttons[1]);
    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('table')).toHaveLength(0);
    // change to table view
    fireEvent.click(buttons[0]);
    expect(container.querySelectorAll('table')).toHaveLength(1);
    expect(container.querySelectorAll('ul')).toHaveLength(0);
  });
});

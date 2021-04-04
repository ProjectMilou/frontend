import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import DashboardTable, { DashboardTableProps } from './DashboardTable';
import { MockOverview, MockOverviewTwo } from '../../portfolio/APIMocks';

describe('DashboardTable', () => {
  const defaultProps: DashboardTableProps = {
    portfolios: [MockOverview, MockOverviewTwo],
    selectPortfolio: jest.fn(),
    renamePortfolio: jest.fn(),
    duplicatePortfolio: jest.fn(),
    deletePortfolio: jest.fn(),
    createPortfolio: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DashboardTableProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DashboardTable {...props} />),
      props,
    };
  };

  test('show message if no portfolios exist', () => {
    const { container, getByText } = renderComponent({ portfolios: [] });
    expect(getByText('portfolio.dashboard.noPortfolios')).toBeInTheDocument();
    // no table
    expect(container.querySelector('table')).toBeNull();
    // no view selection
    expect(container.querySelectorAll('button svg')).toHaveLength(0);
  });

  test('display portfolio information', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('select portfolio on click', () => {
    const { props, getByText } = renderComponent();
    fireEvent.click(getByText(props.portfolios[0].name));
    expect(props.selectPortfolio).toHaveBeenCalledWith(props.portfolios[0].id);
    fireEvent.click(getByText(props.portfolios[1].name));
    expect(props.selectPortfolio).toHaveBeenCalledWith(props.portfolios[1].id);
  });

  test('rename portfolio on click', () => {
    const { props } = renderComponent();
    fireEvent.click(document.querySelectorAll('button svg')[0]);
    expect(props.renamePortfolio).toHaveBeenCalledWith(props.portfolios[0].id);
    fireEvent.click(document.querySelectorAll('button svg')[3]);
    expect(props.renamePortfolio).toHaveBeenCalledWith(props.portfolios[1].id);
    expect(props.selectPortfolio).not.toHaveBeenCalled();
  });

  test('duplicate portfolio on click', () => {
    const { props } = renderComponent();
    fireEvent.click(document.querySelectorAll('button svg')[1]);
    expect(props.duplicatePortfolio).toHaveBeenCalledWith(
      props.portfolios[0].id
    );
    fireEvent.click(document.querySelectorAll('button svg')[4]);
    expect(props.duplicatePortfolio).toHaveBeenCalledWith(
      props.portfolios[1].id
    );
    expect(props.selectPortfolio).not.toHaveBeenCalled();
  });

  test('delete portfolio on click', () => {
    const { props } = renderComponent();
    fireEvent.click(document.querySelectorAll('button svg')[5]);
    expect(props.deletePortfolio).not.toHaveBeenCalled();
    fireEvent.click(document.querySelectorAll('button svg')[2]);
    expect(props.deletePortfolio).toHaveBeenCalledWith(props.portfolios[0].id);
    expect(props.selectPortfolio).not.toHaveBeenCalled();
  });
});

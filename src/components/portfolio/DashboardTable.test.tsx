import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import DashboardTable, { DashboardTableProps } from './DashboardTable';
import { MockOverview, MockOverviewTwo } from '../../portfolio/APIMocks';
import { portfolioDetails } from '../../portfolio/Router';

describe('DashboardTable', () => {
  const defaultProps: DashboardTableProps = {
    portfolios: [MockOverview, MockOverviewTwo],
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

  test('show no table if no portfolios exist', () => {
    const { container } = renderComponent({ portfolios: [] });
    // no table
    expect(container.querySelector('table')).toBeNull();
  });

  test('display portfolio information', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('select portfolio on click', () => {
    const { props, getByText } = renderComponent();
    fireEvent.click(getByText(props.portfolios[0].name));
    expect(portfolioDetails).toHaveBeenCalledWith(props.portfolios[0].id);
    fireEvent.click(getByText(props.portfolios[1].name));
    expect(portfolioDetails).toHaveBeenCalledWith(props.portfolios[1].id);
  });

  test('rename portfolio on click', () => {
    const { props } = renderComponent();
    fireEvent.click(document.querySelectorAll('button svg')[0]);
    expect(props.renamePortfolio).toHaveBeenCalledWith(props.portfolios[0].id);
    fireEvent.click(document.querySelectorAll('button svg')[3]);
    expect(props.renamePortfolio).toHaveBeenCalledWith(props.portfolios[1].id);
    expect(portfolioDetails).not.toHaveBeenCalled();
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
    expect(portfolioDetails).not.toHaveBeenCalled();
  });

  test('delete portfolio on click', () => {
    const { props } = renderComponent();
    fireEvent.click(document.querySelectorAll('button svg')[5]);
    expect(props.deletePortfolio).not.toHaveBeenCalled();
    fireEvent.click(document.querySelectorAll('button svg')[2]);
    expect(props.deletePortfolio).toHaveBeenCalledWith(props.portfolios[0].id);
    expect(portfolioDetails).not.toHaveBeenCalled();
  });
});

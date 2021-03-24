import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import * as API from '../../portfolio/APIClient';
import DashboardTable, { DashboardTableProps } from './DashboardTable';

describe('DashboardTable', () => {
  const defaultProps: DashboardTableProps = {
    portfolios: [API.MockOverview, API.MockOverviewTwo],
    selectPortfolio: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DashboardTableProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DashboardTable {...props} />),
      props,
    };
  };

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
});

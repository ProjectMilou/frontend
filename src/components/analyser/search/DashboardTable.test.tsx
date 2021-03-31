import { render } from '@testing-library/react';
import * as React from 'react';
import DashboardTable, { DashboardTableProps } from './DashboardTable';
import { MockOverview, MockOverviewTwo } from '../../../analyser/APIMocks';

describe('DashboardTable', () => {
  const defaultProps: DashboardTableProps = {
    stocks: [MockOverview, MockOverviewTwo],
    selectStock: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DashboardTableProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DashboardTable {...props} />),
      props,
    };
  };

  test('display stock information', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  //   TODO
  // test('select stock on click', () => {
  //   const { props, getByText } = renderComponent();
  //   fireEvent.click(getByText(props.stocks[0].name));
  //   expect(props.selectStock).toHaveBeenCalledWith(props.stocks[0].symbol);
  //   fireEvent.click(getByText(props.stocks[1].name));
  //   expect(props.selectStock).toHaveBeenCalledWith(props.stocks[1].symbol);
  // });
});

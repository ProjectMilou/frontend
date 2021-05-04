import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DashboardCards, { DashboardCardsProps } from './DashboardCards';
import { MockOverview, MockOverviewTwo } from '../../../analyser/APIMocks';

describe('DashboardCards', () => {
  const defaultProps: DashboardCardsProps = {
    stocks: [MockOverview, MockOverviewTwo],
  };

  const renderComponent = (newProps?: Partial<DashboardCardsProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DashboardCards {...props} />),
      props,
    };
  };

  test('show empty Cards if no stocks exist', () => {
    const { container, queryByText } = renderComponent({ stocks: [] });
    // empty Cards & no error message & no table content
    expect(queryByText('analyser.dashboard.errorMessage')).toBeNull();
    expect(container.querySelector('table')).toBeNull();
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  test('display stock information', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('select stock on click', () => {
    const { props, getByText, queryByText } = renderComponent();
    fireEvent.click(getByText(props.stocks[0].symbol));
    expect(queryByText(props.stocks[0].symbol)).toBeInTheDocument();
    fireEvent.click(getByText(props.stocks[1].symbol));
    expect(queryByText(props.stocks[1].symbol)).toBeInTheDocument();
  });
});

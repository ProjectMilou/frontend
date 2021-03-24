import { render, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import DashboardViewSelect, {
  DashboardView,
  DashboardViewSelectProps,
} from './DashboardViewSelect';

describe('DashboardViewSelect', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  const defaultProps: DashboardViewSelectProps = {
    setView: jest.fn(),
    view: DashboardView.Table,
  };

  const renderComponent = (newProps?: Partial<DashboardViewSelectProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DashboardViewSelect {...props} />),
      props,
    };
  };

  test('change view mode', () => {
    const { container, props } = renderComponent();
    const div = container.children[0];
    // table view selected initially
    expect(container).toMatchSnapshot('table');

    // select cards view
    fireEvent.click(div.children[1]);
    expect(props.setView).toHaveBeenCalledWith(DashboardView.Cards);
    expect(container).toMatchSnapshot('cards');

    // select table view again
    fireEvent.click(div.children[0]);
    expect(props.setView).toHaveBeenCalledWith(DashboardView.Table);
    expect(container).toMatchSnapshot('table');
  });

  test('show tooltips', async () => {
    jest.useFakeTimers();
    const { container, queryByText, findByText } = renderComponent();
    const div = container.children[0];

    // no tooltips visible
    expect(queryByText('portfolio.dashboard.view.table')).toBeNull();
    expect(queryByText('portfolio.dashboard.view.cards')).toBeNull();

    // table tooltip appears on mouse over
    fireEvent.mouseOver(div.children[0]);
    const tableTooltip = await findByText('portfolio.dashboard.view.table');
    expect(tableTooltip).toBeInTheDocument();

    // table tooltip disappears on mouse out
    fireEvent.mouseOut(div.children[0]);
    act(() => {
      jest.runAllTimers();
    });
    expect(tableTooltip).not.toBeInTheDocument();

    // cards tooltip appears on mouse over
    fireEvent.mouseOver(div.children[1]);
    const cardsTooltip = await findByText('portfolio.dashboard.view.cards');
    expect(cardsTooltip).toBeInTheDocument();

    // cards tooltip disappears on mouse out
    fireEvent.mouseOut(div.children[1]);
    act(() => {
      jest.runAllTimers();
    });
    expect(cardsTooltip).not.toBeInTheDocument();
  });
});

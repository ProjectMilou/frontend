import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardCards, { DashboardCardsProps } from './DashboardCards';
import { MockOverview, MockOverviewTwo } from '../../portfolio/APIMocks';

describe('DashboardTable', () => {
  const defaultProps: DashboardCardsProps = {
    portfolios: [MockOverview, MockOverviewTwo],
    renamePortfolio: jest.fn(),
    duplicatePortfolio: jest.fn(),
    deletePortfolio: jest.fn(),
    createPortfolio: jest.fn(),
  };

  const renderComponent = (newProps?: Partial<DashboardCardsProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<DashboardCards {...props} />),
      props,
    };
  };

  test('Dashboard cards renders create portfolio card', async () => {
    const { container } = renderComponent();

    expect(
      container.querySelector('[class *= makeStyles-createPortfolioCard]')
    ).toBeInTheDocument();
  });

  test('Dashboard cards renders import portfolio card', async () => {
    const { container } = renderComponent();

    expect(
      container.querySelector('[class *= makeStyles-importPortfolioCard]')
    ).toBeInTheDocument();
  });

  test('Dashboard cards renders correct amount of cards', async () => {
    const { container } = renderComponent();

    expect(
      container.querySelectorAll('[class *= makeStyles-card]')
    ).toHaveLength(defaultProps.portfolios.length);
  });

  test('Dashboard cards renders cards correctly', async () => {
    const { container } = renderComponent();

    // check names
    defaultProps.portfolios.forEach((p) => screen.getByText(p.name));
    // check values
    defaultProps.portfolios.forEach((p) => screen.getByText(`${p.value}`));
    // check real vs virtual
    defaultProps.portfolios.forEach((p) =>
      p.virtual ? screen.getByText('Virtual') : screen.getByText('Real')
    );
    // check for buttons
    expect(
      container.querySelectorAll('[class *= makeStyles-action]')
    ).toHaveLength(3 * defaultProps.portfolios.length);
  });
});

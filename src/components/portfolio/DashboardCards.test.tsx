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

    // each position is in a grid list tile + create + import
    expect(
      container.querySelectorAll('[class *= makeStyles-gridListTile]')
    ).toHaveLength(defaultProps.portfolios.length + 2);
  });

  test('Dashboard cards renders cards correctly', async () => {
    const { container } = renderComponent();

    // check names
    defaultProps.portfolios.forEach((p) => screen.getByText(p.name));
    // check real vs virtual
    defaultProps.portfolios.forEach((p) =>
      p.virtual
        ? screen.getByText('portfolio.virtual')
        : screen.getByText('portfolio.real')
    );
    // check for buttons
    expect(
      container.querySelectorAll('[class *= makeStyles-action]')
    ).toHaveLength(3 * defaultProps.portfolios.length);
  });
});

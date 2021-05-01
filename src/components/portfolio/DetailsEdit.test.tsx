import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsEdit from './DetailsEdit';
import { Position } from '../../portfolio/APIClient';
import { theme } from '../App';

const mockPositions: Position[] = [
  {
    stock: {
      symbol: 'BMW',
      name: 'BMW',
      price: 23.25,
      perf7d: -1,
      perf7dPercent: -0.3,
      perf1y: 5,
      perf1yPercent: 2,
      volatility: 0.3,
      debtEquity: 0.8,
      score: 0.7,
    },
    qty: 1,
    totalReturn: 6.5,
    totalReturnPercent: 25,
  },
];

// TODO: Test the EditDialog component.

describe('Details Edit', () => {
  test('renders and the edit button works for virtual', () => {
    render(
      <ThemeProvider theme={theme}>
        <DetailsEdit
          positions={mockPositions}
          edit={jest.fn()}
          id="test"
          virtual
        />
      </ThemeProvider>
    );
    const editButton = screen.queryByText('portfolio.details.editPortfolio');
    expect(editButton).toBeInTheDocument();
    if (editButton) {
      userEvent.click(editButton);
      screen.getByText('portfolio.dialog.edit.title');
    }
  });

  test('renders and the edit button does not work for real', () => {
    render(
      <ThemeProvider theme={theme}>
        <DetailsEdit
          positions={mockPositions}
          edit={jest.fn()}
          id="test"
          virtual={false}
        />
      </ThemeProvider>
    );
    const editButton = screen.queryByText('portfolio.details.editPortfolio');
    expect(editButton).toBeInTheDocument();
    if (editButton) {
      userEvent.hover(editButton);
      screen.getByText('portfolio.details.cannotEditPortfolio');
      userEvent.click(editButton);
    }
    expect(
      screen.getByText('portfolio.dialog.edit.title')
    ).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsEdit from './DetailsEdit';
import { Position } from '../../portfolio/APIClient';

const mockPositions: Position[] = [
  {
    stock: {
      isin: '0',
      symbol: 'BMW',
      name: 'BMW',
      price: 23.25,
      perf7d: -1,
      perf1y: 5,
      country: 'Germany',
      industry: 'Auto',
      currency: 'EUR',
      score: 0.7,
    },
    qty: 5,
    totalReturn: 6.5,
    totalReturnPercent: 25,
  },
];

describe('Details Edit', () => {
  test('renders and the buttons work', () => {
    render(<DetailsEdit positions={mockPositions} />);
    const editButton = screen.getByText('portfolio.details.editPortfolio');
    userEvent.click(editButton);
    screen.getByText('portfolio.details.dialogHeader');
    const inputField = screen.getByRole('textbox');

    // testing minus button
    const minusButton = screen.getByRole('button', { name: 'minus' });
    userEvent.click(minusButton);
    expect(inputField.getAttribute('value')).toBe('4');

    // testing plus button
    const plusButton = screen.getByRole('button', { name: 'plus' });
    userEvent.click(plusButton);
    userEvent.click(plusButton);
    expect(inputField.getAttribute('value')).toBe('6');

    // testing trash can button
    const zeroButton = screen.getByRole('button', { name: 'zero' });
    userEvent.click(zeroButton);
    expect(inputField.getAttribute('value')).toBe('0');

    // testing behavior of saveChanges
    // invalid input -> disabled, valid input -> enabled
    const saveChangesButton = screen.getByRole('button', {
      name: 'portfolio.details.saveChanges',
    });
    // above nothing falsy was entered so should be enabled
    expect(saveChangesButton.getAttribute('disabled')).toBeNull();
    // now entering false input to disable it
    userEvent.type(inputField, 'abc');
    expect(saveChangesButton.getAttribute('disabled')).not.toBeNull();
    // entering sane input again, should change back to enabled
    userEvent.clear(inputField);
    userEvent.type(inputField, '25');
    expect(saveChangesButton.getAttribute('disabled')).toBeNull();
  });
});

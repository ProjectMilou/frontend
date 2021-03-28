import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsHeader from './DetailsHeader';
import { mockPositions } from './Details';

const testName = 'My awesome portfolio';
const mockBack = jest.fn();

test('Details header renders correctly', async () => {
  render(
    <DetailsHeader back={mockBack} name={testName} positions={mockPositions} />
  );

  screen.getByText(testName);

  // testing back button
  const backButton = screen.getByRole('button', { name: 'back' });
  await userEvent.click(backButton);
  expect(mockBack).toHaveBeenCalled();

  // testing edit button
  const editButton = screen.getByText('portfolio.details.editPortfolio');
  await userEvent.click(editButton);
  await screen.findByText('portfolio.details.dialogHeader');
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsMainPositions from './DetailsMainPositions';
import { mockPositions } from './Details';

test('DetailsMainPositions render correctly', () => {
  render(<DetailsMainPositions positions={mockPositions} />);

  screen.getByText('BMW');
  screen.getByText(/23.25/);
  screen.getAllByText('portfolio.details.day7');
  screen.getAllByText('portfolio.details.year');
});

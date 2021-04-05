import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsMainPositions from './DetailsMainPositions';
import { MockPositions } from '../../portfolio/APIMocks';

test('DetailsMainPositions render correctly', () => {
  render(<DetailsMainPositions positions={MockPositions} />);

  screen.getByText('BMW');
  expect(screen.getAllByText(/23.25/)).toHaveLength(2);
  screen.getAllByText('portfolio.details.day7');
  screen.getAllByText('portfolio.details.year');
});

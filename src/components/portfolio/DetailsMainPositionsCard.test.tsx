import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsMainPositionsCard from './DetailsMainPositionsCard';
import { MockPositions } from '../../portfolio/APIMocks';
import { theme } from '../App';

test('Card renders correctly', async () => {
  const mockP = MockPositions[0];

  render(
    <ThemeProvider theme={theme}>
      <DetailsMainPositionsCard p={mockP} />
    </ThemeProvider>
  );

  // check for name
  screen.getByText(mockP.stock.name);

  // check for holding
  screen.getByText('portfolio.details.holding:');
  // check for amount
  screen.getByText('portfolio.details.amount:');
  screen.getByText(mockP.qty);
  // check for per share
  screen.getByText('portfolio.details.perShare:');

  // check for 7 day
  screen.getByText('portfolio.details.day7');
  // check for 1 year
  screen.getByText('portfolio.details.year');
  // check for total
  screen.getByText('portfolio.details.totalReturn');

  // check for view more button
  screen.getByText('portfolio.details.viewMore');
});

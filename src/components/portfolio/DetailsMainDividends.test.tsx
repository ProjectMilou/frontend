import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsMainDividends from './DetailsMainDividends';
import { MockDetails } from '../../portfolio/APIMocks';
import { theme } from '../App';

test('Dividens section renders correctly', async () => {
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DetailsMainDividends portfolio={MockDetails} />
      </ThemeProvider>
    );

  const { container } = renderComponent();

  // check for div yield title
  screen.getByText('portfolio.details.divYield');

  // check for div payout title
  screen.getByText('portfolio.details.divPayout');

  // check for next date title
  screen.getByText('portfolio.details.nextDate');
  // check for correct next date value
  screen.getByText(`${MockDetails.nextDividend.toISOString().split('T')[0]}`);

  // check for both graphs
  expect(
    container.querySelectorAll('[class *= makeStyles-chartContainer]')
      .length === 2
  ).toBeTruthy();
});

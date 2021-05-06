import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsMainDividends from './DetailsMainDividends';
import { MockDetails } from '../../portfolio/APIMocks';
import { theme } from '../App';

describe('DetailsMainDividends', () => {
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DetailsMainDividends portfolio={MockDetails} />
      </ThemeProvider>
    );

  test('Dividens side info renders', async () => {
    renderComponent();

    // check for div yield title
    screen.getByText('portfolio.details.divYield');

    // check for div payout title
    screen.getByText('portfolio.details.divPayout');

    // check for next date title
    screen.getByText('portfolio.details.nextDate');
  });

  test('Both graphs render', async () => {
    const { container } = renderComponent();

    // check for both graphs
    expect(
      container.querySelectorAll('[class *= makeStyles-chartContainer]')
    ).toHaveLength(2);
  });
});

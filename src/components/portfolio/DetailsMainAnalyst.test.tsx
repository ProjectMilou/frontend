import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsMainAnalyst from './DetailsMainAnalyst';
import { MockPositions } from '../../portfolio/APIMocks';
import { theme } from '../App';

test('Analyst section renders the bar with a least 1 indicator', async () => {
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DetailsMainAnalyst positions={MockPositions} />
      </ThemeProvider>
    );

  const { container } = renderComponent();

  // check for desciption
  screen.getByText('portfolio.details.analystSubtext');
  // check for bar
  expect(
    container.querySelector('[class ^= makeStyles-barContainer]')
  ).toBeInTheDocument();
  // check for at least one indicator
  expect(
    container.querySelectorAll('[class ^= makeStyles-barContainer]')[0]
      .childNodes.length > 0
  ).toBeTruthy();
});

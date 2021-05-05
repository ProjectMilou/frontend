import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsDonut from './DetailsDonut';
import { MockDetails } from '../../portfolio/APIMocks';
import { theme } from '../App';

test('Details donut renders correctly', async () => {
  const sortedPos = MockDetails.positions.sort(
    (a, b) => b.qty * b.stock.price - a.qty * a.stock.price
  );

  const portions = sortedPos.map((p) => p.qty * p.stock.price);
  const companyNames = sortedPos.map((p) => p.stock.name);

  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DetailsDonut portions={portions} labels={companyNames} size={300} />
      </ThemeProvider>
    );

  const { container } = renderComponent();

  // check for correct legend
  expect(
    container.querySelector('[class *= makeStyles-legend]')
  ).toBeInTheDocument();

  // check for correct legend length
  expect(
    container.querySelectorAll('[class *= makeStyles-legendItem]').length < 5
  ).toBeTruthy();

  // check for 'other'
  if (
    container.querySelectorAll('[class *= makeStyles-legendItem]').length === 4
  ) {
    screen.getByText('portfolio.details.other');
  }
  // check for graph
  expect(
    container.querySelector('[class *= makeStyles-graphWrapper]')
  ).toBeInTheDocument();
});

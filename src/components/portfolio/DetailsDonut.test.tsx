import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsDonut from './DetailsDonut';
import { MockDetails } from '../../portfolio/APIMocks';
import { theme } from '../App';

describe('DetailsDonut', () => {
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

  test('Legend renders correctly', async () => {
    const { container } = renderComponent();

    // check for legend
    expect(
      container.querySelector('[class *= makeStyles-legend]')
    ).toBeInTheDocument();

    // check for correct legend length
    expect(
      container.querySelectorAll('[class *= makeStyles-legendItem]').length < 5
    ).toBeTruthy();

    // check for 'other' if there are more than 4 stocks
    if (
      container.querySelectorAll('[class *= makeStyles-legendItem]').length >= 5
    ) {
      screen.getByText('portfolio.details.other');
    }
  });

  test('Graph is rendered', async () => {
    const { container } = renderComponent();
    // check for graph
    expect(
      container.querySelector('[class *= makeStyles-graphWrapper]')
    ).toBeInTheDocument();
  });
});

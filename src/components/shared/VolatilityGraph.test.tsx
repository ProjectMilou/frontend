import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import VolatilityGraph from './VolatilityGraph';
import { theme } from '../App';

describe('VolatilityGraph', () => {
  render(
    <ThemeProvider theme={theme}>
      <VolatilityGraph color={theme.palette.primary.contrastText} />
    </ThemeProvider>
  );

  test('display volatility graph and market average', () => {
    expect(
      screen.getByText('portfolio.details.analytics.volatility.marketAvg')
    ).toBeInTheDocument();
  });
});

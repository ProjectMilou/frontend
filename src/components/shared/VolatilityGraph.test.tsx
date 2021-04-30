import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { createMuiTheme } from '@material-ui/core';
import VolatilityGraph from './VolatilityGraph';

describe('VolatilityGraph', () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#415176',
        main: '#122654',
        dark: '#0c1a3a',
        contrastText: '#EEF1FB',
      },
    },
  });

  test('display volatility graph and market average', () => {
    render(<VolatilityGraph color={theme.palette.primary.contrastText} />);
    screen.getByText('portfolio.details.analytics.volatility.marketAvg');
  });
});

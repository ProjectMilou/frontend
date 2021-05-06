import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import VolatilityLineEntry from './VolatilityLineEntry';
import { theme } from '../App';

describe('VolatilityLineEntry', () => {
  const container = render(
    <ThemeProvider theme={theme}>
      <VolatilityLineEntry
        volatilityValue={1.0}
        tooltipText="My Portfolio"
        color={theme.palette.primary.contrastText}
      />
    </ThemeProvider>
  );

  test('renders volatility line entry', () => {
    expect(container).toBeDefined();
  });
});

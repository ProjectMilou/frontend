import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import VolatilityLineEntry from './VolatilityLineEntry';
import { theme } from '../App';

describe('VolatilityLineEntry', () => {
  test('render volatility line entry', () => {
    const container = render(
      <ThemeProvider theme={theme}>
        <VolatilityLineEntry
          volatilityValue={2.0}
          tooltipText="My Portfolio"
          color={theme.palette.primary.contrastText}
        />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

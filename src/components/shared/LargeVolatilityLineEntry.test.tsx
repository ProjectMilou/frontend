import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { theme } from '../App';
import LargeVolatilityLineEntry from './LargeVolatilityLineEntry';

describe('LargeVolatilityLineEntry', () => {
  const { t } = useTranslation();

  const container = render(
    <ThemeProvider theme={theme}>
      <LargeVolatilityLineEntry
        volatilityValue={2.3}
        marketValue={1}
        name={t(
          'portfolio.details.analytics.volatility.myPortfolio'
        ).toString()}
        textColor={theme.palette.primary.contrastText}
      />
    </ThemeProvider>
  );

  test('display large volatility line text', () => {
    expect(
      container.getByText('portfolio.details.analytics.volatility.myPortfolio')
    ).toBeInTheDocument();
  });
});

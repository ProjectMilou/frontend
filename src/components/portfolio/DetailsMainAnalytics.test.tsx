import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsMainAnalytics from './DetailsMainAnalytics';
import { MockDetails } from '../../portfolio/APIMocks';
import { theme } from '../App';

describe('DetailsMainAnalytics', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DetailsMainAnalytics portfolio={MockDetails} />
      </ThemeProvider>
    );
    expect(
      getByText('portfolio.details.analytics.standardDeviation')
    ).toBeInTheDocument();
    expect(getByText('12,00 %')).toBeInTheDocument();
    expect(
      getByText('portfolio.details.analytics.correlation')
    ).toBeInTheDocument();
    expect(
      getByText('portfolio.details.analytics.debtEquity.total')
    ).toBeInTheDocument();
    expect(getByText('0,55')).toBeInTheDocument();
    expect(
      getByText('portfolio.details.analytics.volatility.total')
    ).toBeInTheDocument();
    expect(getByText('1,45')).toBeInTheDocument();
    expect(
      getByText('portfolio.details.analytics.volatility.vsMarket')
    ).toBeInTheDocument();
  });
});

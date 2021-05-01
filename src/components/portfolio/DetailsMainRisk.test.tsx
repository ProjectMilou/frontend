import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsMainRisk from './DetailsMainRisk';
import { MockDetails } from '../../portfolio/APIMocks';
import { theme } from '../App';

test('Risk section renders correctly', async () => {
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DetailsMainRisk
          risk={MockDetails.risk}
          sharpeRatio={MockDetails.analytics.sharpeRatio}
          treynorRatio={MockDetails.analytics.treynorRatio}
        />
      </ThemeProvider>
    );

  const { container } = renderComponent();

  // check for sharpe ratio title
  screen.getByText('portfolio.details.sharpe');
  // check for treynor ratio title
  screen.getByText('portfolio.details.treynor');

  // check for both info buttons (sharpe and treynor)
  expect(
    container.querySelectorAll('[class *= makeStyles-infoIcon]').length === 2
  ).toBeTruthy();

  // check for countries title
  screen.getAllByText('portfolio.details.countries');
  // check for segments title
  screen.getAllByText('portfolio.details.segments');
  // check for currencies title
  screen.getAllByText('portfolio.details.currencies');

  // check for all three graphs
  expect(
    container.querySelectorAll('[class *= makeStyles-graphWrapper]')
  ).toHaveLength(3);

  // check that the legends combined have no more than 12 visible entries
  expect(
    container.querySelectorAll('[class *= makeStyles-legendItem]').length <= 12
  ).toBeTruthy();

  // check for all three warning segments
  expect(
    container.querySelectorAll('[class *= makeStyles-riskCompWrapper]')
  ).toHaveLength(3);
});

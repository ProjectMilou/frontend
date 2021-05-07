import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsHeader from './DetailsHeader';
import { MockPositions } from '../../portfolio/APIMocks';
import { portfolioDashboard } from '../../portfolio/Router';
import { theme } from '../App';

describe('DetailsHeader', () => {
  const testName = 'My awesome portfolio';

  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DetailsHeader
          name={testName}
          positions={MockPositions}
          editPositions={jest.fn()}
          id="TestId"
          virtual
        />
      </ThemeProvider>
    );

  test('Details header renders correctly', async () => {
    renderComponent();

    screen.getByText(testName);

    // testing back button
    const backButton = screen.getByRole('button', { name: 'back' });
    await userEvent.click(backButton);
    expect(portfolioDashboard).toHaveBeenCalled();

    // testing edit button
    expect(
      screen.getByText('portfolio.details.editPortfolio')
    ).toBeInTheDocument();
  });

  test('Back button works', async () => {
    renderComponent();

    // testing back button
    const backButton = screen.getByRole('button', { name: 'back' });
    await userEvent.click(backButton);
    expect(portfolioDashboard).toHaveBeenCalled();
  });

  test('Edit button works', async () => {
    renderComponent();

    // testing edit button
    expect(
      screen.getByText('portfolio.details.editPortfolio')
    ).toBeInTheDocument();
  });
});

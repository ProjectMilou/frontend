import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsHeader from './DetailsHeader';
import { MockPositions } from '../../portfolio/APIMocks';
import { portfolioDashboard } from '../../portfolio/Router';
import { theme } from '../App';

const testName = 'My awesome portfolio';

test('Details header renders correctly', async () => {
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

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@material-ui/core/styles';
import DetailsHeader from './DetailsHeader';
import { MockPositions } from '../../portfolio/APIMocks';
import { theme } from '../App';

const testName = 'My awesome portfolio';
const mockBack = jest.fn();

test('Details header renders correctly', async () => {
  render(
    <ThemeProvider theme={theme}>
      <DetailsHeader
        back={mockBack}
        name={testName}
        positions={MockPositions}
        editPositions={jest.fn()}
      />
    </ThemeProvider>
  );

  screen.getByText(testName);

  // testing back button
  const backButton = screen.getByRole('button', { name: 'back' });
  await userEvent.click(backButton);
  expect(mockBack).toHaveBeenCalled();

  // testing edit button
  expect(
    screen.getByText('portfolio.details.editPortfolio')
  ).toBeInTheDocument();
});

import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import DetailsMainBacktesting from './DetailsMainBacktesting';
import * as API from '../../portfolio/APIClient';
import { MockBacktesting } from '../../portfolio/APIMocks';
import { theme } from '../App';

// setup for mock
jest.mock('../../portfolio/APIClient');
const mockAPI = API as jest.Mocked<typeof API>;

test('Backtesting renders correctly', async () => {
  // mocking api call
  const mockBacktesting = mockAPI.backtesting.mockResolvedValue(
    MockBacktesting
  );
  const backtestingComponent = render(
    <ThemeProvider theme={theme}>
      <DetailsMainBacktesting id="mockID" />
    </ThemeProvider>
  );
  // waiting until render has finished
  await act(async () => {
    await waitFor(() => {
      expect(mockBacktesting).toHaveBeenCalledTimes(1);
    });
  });
  // checking if all the relevant data is being displayed properly
  const expectedStrings = [
    backtestingComponent.getByText('portfolio.details.backtesting.start'),
    backtestingComponent.getByText('portfolio.details.backtesting.min'),
    backtestingComponent.getByText('portfolio.details.backtesting.max'),
    backtestingComponent.getByText('portfolio.details.backtesting.end'),
    backtestingComponent.getByText('portfolio.details.backtesting.bestChange'),
    backtestingComponent.getByText('portfolio.details.backtesting.worstChange'),
    backtestingComponent.getByText('portfolio.details.backtesting.mddMinMax'),
    backtestingComponent.getByText(
      'portfolio.details.backtesting.standardDeviation'
    ),
    backtestingComponent.getByText('portfolio.details.backtesting.sharpeRatio'),
    backtestingComponent.getByText('portfolio.details.backtesting.cagr'),
  ];
  expectedStrings.forEach((string) => expect(string).toBeInTheDocument());
});

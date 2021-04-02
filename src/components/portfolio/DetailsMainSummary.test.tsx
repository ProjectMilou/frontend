import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsMainSummary from './DetailsMainSummary';
<<<<<<< HEAD
import { mock } from './Details';

jest.mock('./DetailsDonut', () => 'p');
=======
import { mock, mockPerformance } from './Details';

jest.mock('./DetailsDonut', () => 'p');
jest.mock('../shared/StockChart', () => 'p');
>>>>>>> analyser

test('DetailsMainSummary renders correctly', () => {
  render(
    <DetailsMainSummary
      score={mock.score}
      perf7d={mock.perf7d}
      perf1y={mock.perf1y}
      value={mock.value}
      positionCount={mock.positionCount}
      risk={mock.risk}
      positions={mock.positions}
<<<<<<< HEAD
=======
      performance={mockPerformance}
>>>>>>> analyser
    />
  );

  screen.getAllByText(mock.score, { exact: false });
  screen.getAllByText(mock.perf7d, { exact: false });
  screen.getAllByText(mock.perf1y, { exact: false });
  screen.getAllByText(mock.value, { exact: false });
  screen.getAllByText(mock.positionCount, { exact: false });
  // TODO add tests for number of countries, industries and currencies when the correct values are being displayed.
});

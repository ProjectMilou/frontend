import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsMainSummary from './DetailsMainSummary';
import { MockDetails } from '../../portfolio/APIMocks';

test('DetailsMainSummary renders correctly', () => {
  render(<DetailsMainSummary portfolio={MockDetails} />);

  screen.getAllByText(MockDetails.overview.score, { exact: false });
  screen.getAllByText(MockDetails.overview.perf7d, { exact: false });
  screen.getAllByText(MockDetails.overview.perf1y, { exact: false });
  // due to the use of EuroCurrency the decimal separator is changed.
  // TODO use regex instead of hard coding the expected text
  screen.getAllByText('174,98', { exact: false });
  screen.getAllByText(MockDetails.overview.positionCount, { exact: false });
  // TODO add tests for number of countries, industries and currencies when the correct values are being displayed.
});

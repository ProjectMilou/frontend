import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsListEntry from './DetailsListEntry';

const testAmount = 5;
const testName = 'Tesla';
const testPrice = 15.3;

test('renders DetailsHeader', () => {
  const { getByText } = render(
    <DetailsListEntry name={testName} amount={testAmount} price={testPrice} />
  );

  screen.getByText(testName);
  screen.getByText(/15.3/);
  screen.getByDisplayValue(testAmount);
});

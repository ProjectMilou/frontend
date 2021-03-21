import * as React from 'react';
import { render } from '@testing-library/react';
import DetailsListEntry from './DetailsListEntry';

const testName = 'BMW';
const testAmount = 7;
const testPrice = 10.5;

test('renders DetailsHeader', () => {
  const { getByText } = render(
    <DetailsListEntry name={testName} amount={testAmount} price={testPrice} />
  );

  getByText('BMW');
  // getByText('7');
  getByText('10.5');
});

import * as React from 'react';
import { render } from '@testing-library/react';
import DetailsHeader from './DetailsHeader';

const testName = 'Awesome Portfolio';

test('renders DetailsHeader', () => {
  const { getByText } = render(
    <DetailsHeader back={() => null} name={testName} positions={[]} />
  );

  getByText('Awesome Portfolio');
});

import React from 'react';
import { render } from '@testing-library/react';
import NoInfoAvailable from './NoInfoAvailable';

describe('NoInfoAvailable', () => {
  test('renders correctly', () => {
    const noInfoAvailable = render(<NoInfoAvailable />);
    expect(
      noInfoAvailable.getByText('portfolio.details.emptyKeyFigures')
    ).toBeInTheDocument();
  });
});

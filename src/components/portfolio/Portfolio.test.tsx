import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Portfolio from './Portfolio';

describe('Portfolio', () => {
  // TODO: Write actual tests
  test.skip('example test', () => {
    render(<Portfolio />);
    expect(screen.getByText('Analyser component')).toBeInTheDocument();
  });
});

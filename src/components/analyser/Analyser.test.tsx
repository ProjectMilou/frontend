import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Analyser from './Analyser';

describe('Analyser', () => {
  // TODO: Write actual tests
  test('example test', () => {
    render(<Analyser />);
    expect(screen.getByText(/Analyser component/i)).toBeInTheDocument();
  });
});

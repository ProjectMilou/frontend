import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Shell from './Shell';

describe('Shell', () => {
  // TODO: Write actual tests
  test('example test', () => {
    render(<Shell />);
    expect(screen.getByText(/Shell component/i)).toBeInTheDocument();
  });
});

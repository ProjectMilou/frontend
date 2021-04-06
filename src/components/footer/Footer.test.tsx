import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
  // TODO: Write actual tests
  test('Renders all buttons', () => {
    render(<Footer />);
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
    expect(screen.getByText(/Mobile App/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });
});

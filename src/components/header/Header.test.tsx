import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  // TODO: Write actual tests
  test('Renders all buttons', () => {
    render(<Header />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Analyser/i)).toBeInTheDocument();
    expect(screen.getByText(/Academy/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});

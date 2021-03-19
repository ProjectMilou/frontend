import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders first <p>', () => {
    render(<App />);
    const linkElement = screen.getByText(/Here be an app/i);
    expect(linkElement).toBeInTheDocument();
  });
});

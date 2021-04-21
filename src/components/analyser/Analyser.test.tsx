import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Analyser from './Analyser';

describe('Analyser', () => {
  test('renders first <p>', () => {
    render(<Analyser />);
    const linkElement = screen.getByText(/Analyser/i);
    expect(linkElement).toBeInTheDocument();
  });
});
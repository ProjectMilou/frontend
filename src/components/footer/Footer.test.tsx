import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
  test('should renders all buttons', () => {
    render(<Footer />);
    expect(screen.getByText(/footer.imprint/i)).toBeInTheDocument();
    expect(screen.getByText(/footer.privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/footer.aboutUs/i)).toBeInTheDocument();
  });

  test('should change urls', () => {
    render(<Footer />);
    const imprintLink = screen.getByText(/footer.imprint/i);
    fireEvent.click(imprintLink);
    expect(window.location.pathname).toBe('/imprint');

    const privacyLink = screen.getByText(/footer.privacy/i);
    fireEvent.click(privacyLink);
    expect(window.location.pathname).toBe('/privacy');

    const aboutUsLink = screen.getByText(/footer.aboutUs/i);
    fireEvent.click(aboutUsLink);
    expect(window.location.pathname).toBe('/aboutus');
  });
});

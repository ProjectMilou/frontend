import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  // TODO: Write actual tests
  test('Renders all links and buttons', () => {
    render(<Header />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Analyser/i)).toBeInTheDocument();
    expect(screen.getByText(/Academy/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('All links change the url', () => {
    render(<Header />);
    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);
    expect(location.pathname).toBe('/');

    const portfolioLink = screen.getByText(/Portfolio/i);
    fireEvent.click(portfolioLink);
    expect(location.pathname).toBe('/portfolio');

    const analyserLink = screen.getByText(/Analyser/i);
    fireEvent.click(analyserLink);
    expect(location.pathname).toBe('/analyser');

    const academyLink = screen.getByText(/Academy/i);
    fireEvent.click(academyLink);
    expect(location.pathname).toBe('/academy');
  });
});

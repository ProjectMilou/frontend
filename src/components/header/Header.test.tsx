import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
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
    expect(window.location.pathname).toBe('/');

    const portfolioLink = screen.getByText(/Portfolio/i);
    fireEvent.click(portfolioLink);
    expect(window.location.pathname).toBe('/portfolio');

    const analyserLink = screen.getByText(/Analyser/i);
    fireEvent.click(analyserLink);
    expect(window.location.pathname).toBe('/analyser');

    const academyLink = screen.getByText(/Academy/i);
    fireEvent.click(academyLink);
    expect(window.location.pathname).toBe('/academy');
  });

  test('should open login', () => {
    render(<Header />);
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);
    waitFor(() => {
      expect(screen.getByText(/shell.message.forgotPassword/i)).toBeInTheDocument();
      expect(screen.getByText(/shell.password/i)).toBeInTheDocument();
      // waitFor() is needed as the state of the component is changed
      // and it must be re-rendered.
      // Work-around "Promise must be handled (testing-library/await-async-utils)":
    }).then(() => {})
  });
});

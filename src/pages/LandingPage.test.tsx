import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import LandingPage from './LandingPage';


describe('LandingPage', () => {
  test('should render landingPage', async () => {
    const { container } = render(<LandingPage />);
    expect(container).toMatchSnapshot();
  });

  test('should navigate to analyser', async () => {
    render(<LandingPage />);
    const goToAnalyser1 = screen.getByText(/Start now/i);
    expect(goToAnalyser1).toBeInTheDocument();
    fireEvent.click(goToAnalyser1);
    waitFor(() => expect(window.location.pathname).toBe('/analyser')).then(() => {});

    window.location.pathname = '/';
    expect(window.location.pathname).toBe('/')

    const goToAnalyser2 = screen.getByText(/Start for free/i);
    expect(goToAnalyser2).toBeInTheDocument();
    fireEvent.click(goToAnalyser2);
    waitFor(() => expect(window.location.pathname).toBe('/analyser')).then(() => {});
  });
});
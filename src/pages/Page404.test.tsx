import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import Page404 from './Page404';

describe('404 Page', () => {
  test('should render 404-page', async () => {
    const { container } = render(<Page404 />);
    expect(container).toMatchSnapshot();
  });

  test('should navigate to home', async () => {
    render(<Page404 />);
    const goToHome = screen.getByText(/error.action.home/i);
    fireEvent.click(goToHome);
    expect(window.location.pathname).toBe('/');
  });
});

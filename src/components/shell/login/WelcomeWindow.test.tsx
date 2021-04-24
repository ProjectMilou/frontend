import { render, screen } from '@testing-library/react';
import * as React from 'react';
import WelcomeWindow from './WelcomeWindow';

describe('WelcomeWindow', () => {
  const renderWindow = () => {
    const props = {
      closePopUp: jest.fn(),
      text: ['test', 'test2'],
    };
    render(<WelcomeWindow {...props} />);
    return {
      ...props,
    };
  };

  test('should close itself', () => {
    const { closePopUp } = renderWindow();
    setTimeout(() => {
      expect(closePopUp).toBeCalled();
    }, 10000);
  });

  test('should display text', () => {
    const { text } = renderWindow();
    expect(screen.getByText(text[0])).toBeInTheDocument();
    expect(screen.getByText(text[1])).toBeInTheDocument();
  });
});

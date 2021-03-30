import { render, screen } from '@testing-library/react';
import * as React from 'react';
import WelcomeWindow from './WelcomeWindow';

describe('WelcomeWindow', () => {
  test('should close itself', () => {
    const closePopUp = jest.fn();
    const text = [''];

    render(<WelcomeWindow closePopUp={closePopUp} text={text} />);

    setTimeout(() => {
      expect(closePopUp).toBeCalled();
    }, 10000);
  });

  test('should display text', () => {
    const closePopUp = jest.fn();
    const text = ['test', 'test2'];

    render(<WelcomeWindow closePopUp={closePopUp} text={text} />);
    for (let t of text) {
      screen.getByText(t);
    }
  });
});

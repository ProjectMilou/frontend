import { render } from '@testing-library/react';
import * as React from 'react';
import ResetSuccessWindow from './ResetSuccessWindow';

describe('ResetSuccessWindow', () => {
  const renderWindow = () => {
    const props = {
      closePopUp: jest.fn(),
    };
    return {
      ...render(<ResetSuccessWindow {...props} />),
      ...props,
    };
  };

  test('should close itself', () => {
    const { closePopUp } = renderWindow();
    setTimeout(() => {
      expect(closePopUp).toBeCalled();
    }, 5000);
  });
});

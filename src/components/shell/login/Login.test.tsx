import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import * as React from 'react';
import Login from './Login';

describe('Login', () => {
  const renderLogin = () => {
    const props = {
      closePopUp: jest.fn(),
      openRegisterPopUp: jest.fn(),
      openForgotPasswordPopUp: jest.fn(),
    };
    return {
      component: render(<Login {...props} />),
      ...props,
    };
  };

  test('should close popup window', async () => {
    const { component, closePopUp } = renderLogin();
    const { findByTestId } = component;

    const icon = await findByTestId('icon');
    userEvent.click(icon);
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });
});

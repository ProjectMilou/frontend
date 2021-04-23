import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
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

  test('should close popup window on click', async () => {
    const { component, closePopUp } = renderLogin();
    const { findByTestId } = component;
    const icon = await findByTestId('icon');
    userEvent.click(icon);
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  test('should close popup window on keydown', async () => {
    const { component, closePopUp } = renderLogin();
    const { findByTestId } = component;
    const icon = await findByTestId('icon');
    fireEvent.keyDown(icon, { key: 'Enter', code: 'Enter' });
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  test('should open register window', async () => {
    const { closePopUp, openRegisterPopUp } = renderLogin();
    const linkList = screen.getAllByRole('button');
    const link = linkList[linkList.length - 1];
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(closePopUp).toHaveBeenCalledTimes(1);
    expect(openRegisterPopUp).toHaveBeenCalledTimes(1);
  });
});

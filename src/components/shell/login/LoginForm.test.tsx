import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const renderLoginForm = () => {
  const props = {
    closePopUp: jest.fn(),
    openRegisterPopUpWindow: jest.fn(),
    openForgotPasswordPopUpWindow: jest.fn(),
    setUserState: jest.fn(),
  };
  return {
    component: render(<LoginForm {...props} />),
    ...props,
  };
};

describe('LoginForm', () => {
  test('should render email and password input', async () => {
    const { component } = renderLoginForm();
    const { findByTestId } = component;

    const passwordInput = await findByTestId('password');
    const emailInput = await findByTestId('email');

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('should put in text and enable submit-button', async () => {
    const { component } = renderLoginForm();
    const { findByTestId } = component;

    const passwordInput = (await findByTestId('password')) as HTMLInputElement;
    const emailInput = (await findByTestId('email')) as HTMLInputElement;
    const button = (await findByTestId('login')) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: 'email' } });
    fireEvent.change(passwordInput, { target: { value: 'pwd' } });

    expect(emailInput.value).toBe('email');
    expect(passwordInput.value).toBe('pwd');
    expect(button).toBeEnabled();
    expect(emailInput.getAttribute('aria-invalid')).toBe('false');
    expect(passwordInput.getAttribute('aria-invalid')).toBe('false');
  });

  test('should disable submit-button', async () => {
    const { component } = renderLoginForm();
    const { findByTestId } = component;

    const passwordInput = (await findByTestId('password')) as HTMLInputElement;
    const emailInput = (await findByTestId('email')) as HTMLInputElement;
    const button = (await findByTestId('login')) as HTMLButtonElement;

    expect(emailInput.getAttribute('aria-invalid')).toBe('false');

    // both inputs empty
    expect(button).toBeDisabled();

    // password input empty
    userEvent.type(emailInput, 'email');
    expect(button).toBeDisabled();

    // email input empty
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    expect(button).toBeDisabled();
  });

  // Tests for mock user login (success and error)
});

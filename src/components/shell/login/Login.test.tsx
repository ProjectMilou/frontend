import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

const renderLoginForm = (closePopUp = jest.fn()) => {
  const openRegisterPopUp = () => {};
  return render(
    <Login closePopUp={closePopUp} openRegisterPopUp={openRegisterPopUp} />
  );
};

describe('Login', () => {
  test('should render email and password input', async () => {
    const { findByTestId } = renderLoginForm();

    const passwordInput = await findByTestId('password');
    const emailInput = await findByTestId('email');

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('should put in text and enable submit-button', async () => {
    const { findByTestId } = renderLoginForm();

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
    const { findByTestId } = renderLoginForm();

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

  test('should close popup window', async () => {
    const closePopUp = jest.fn();
    const { findByTestId } = renderLoginForm(closePopUp);

    const icon = await findByTestId('icon');
    userEvent.click(icon);
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  // Tests for mock user login (success and error)
});

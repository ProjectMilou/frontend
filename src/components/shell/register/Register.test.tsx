import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import Register from './Register';

const renderRegisterForm = () => {
  const closePopUp = () => {};
  const openLoginPopUp = () => {};
  return render(
    <Register closePopUp={closePopUp} openLoginPopUp={openLoginPopUp} />
  );
};

const getFields = async () => {
  const { findByTestId } = renderRegisterForm();
  const emailInput = (await findByTestId('email')) as HTMLInputElement;
  const passwordInput = (await findByTestId('password')) as HTMLInputElement;
  const confirmPasswordInput = (await findByTestId(
    'confirm-password'
  )) as HTMLInputElement;
  const button = (await findByTestId('register')) as HTMLButtonElement;
  return { emailInput, passwordInput, confirmPasswordInput, button };
};

describe('Register', () => {
  test('should render input fields', async () => {
    const {
      emailInput,
      passwordInput,
      confirmPasswordInput,
      button,
    } = await getFields();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should put in text and enable submit-button', async () => {
    const {
      emailInput,
      passwordInput,
      confirmPasswordInput,
      button,
    } = await getFields();

    fireEvent.change(emailInput, { target: { value: 'email' } });
    expect(button).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    expect(button).toBeDisabled();

    fireEvent.change(confirmPasswordInput, { target: { value: 'pwd2' } });
    expect(button).toBeEnabled();

    expect(emailInput.value).toBe('email');
    expect(passwordInput.value).toBe('pwd');
    expect(confirmPasswordInput.value).toBe('pwd2');
  });

  test('should fail to submit -- invalid email address', async () => {
    const {
      emailInput,
      passwordInput,
      confirmPasswordInput,
      button,
    } = await getFields();
    fireEvent.change(emailInput, { target: { value: 'email' } });
    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pwd' } });
    fireEvent.click(button);
    expect(emailInput.value).toBe('email');
    expect(emailInput.getAttribute('aria-invalid')).toBe('true');
  });

  test('should fail to submit -- pwd is not equal to confirm-pwd', async () => {
    const {
      emailInput,
      passwordInput,
      confirmPasswordInput,
      button,
    } = await getFields();
    fireEvent.change(emailInput, { target: { value: 'example@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pwd2' } });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(confirmPasswordInput.getAttribute('aria-invalid')).toBe('true');
  });
});

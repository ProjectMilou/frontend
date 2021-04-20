import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import PasswordField from './PasswordField';

const renderPasswordField = () => {
  const props = {
    hasError: {
      email: "",
      password: "invalid",
      confirmPassword: "pwd-invalid"
    },
    setError: jest.fn(),
    login: {
      password: "pwd",
      confirmPassword: "pwd-invalid"
    },
    handleChange: jest.fn(),
  };
  return {
    component: render(<PasswordField {...props} />),
    ...props,
  };
};

describe('PasswordField', () => {
  test('should render password and confirm-password fields', async () => {
    const { component } = renderPasswordField();
    const { findByTestId } = component;

    const password = await findByTestId('password');
    const confirmPassword = await findByTestId('confirm-password');

    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
  });

  test('should render invalid email and password fields', async () => {
    const { component } = renderPasswordField();
    const { findByTestId } = component;

    const password = await findByTestId('password');
    const confirmPassword = await findByTestId('confirm-password');

    expect(password.getAttribute('aria-invalid')).toBe('true');
    expect(confirmPassword.getAttribute('aria-invalid')).toBe('true');
  });

  test('should render input', async () => {
    const { component, handleChange} = renderPasswordField();
    const { findByTestId } = component;

    const password = await findByTestId('password');
    const confirmPassword = await findByTestId('confirm-password');

    fireEvent.change(password, { target: { value: 'pwd' } });
    fireEvent.change(confirmPassword, { target: { value: 'pwd-2' } });

    expect(handleChange).toHaveBeenCalledTimes(1)
  });
})
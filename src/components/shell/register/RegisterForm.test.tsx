import { cleanup, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import RegisterForm from './RegisterForm';

afterEach(cleanup);

const renderRegisterForm = () => {
  const props = {
    onSuccess: jest.fn(),
    onFail: jest.fn(),
    goToLogin: jest.fn(),
    login: {
      email: 'test@milou.de',
      password: '',
      confirmPassword: '',
    },
    setLogin: jest.fn(),
  };
  return {
    component: render(<RegisterForm {...props} />),
    ...props,
  };
};

const getFields = async () => {
  const { component } = renderRegisterForm();
  const { findByTestId } = component;
  const emailInput = (await findByTestId('email')) as HTMLInputElement;
  const passwordInput = (await findByTestId('password')) as HTMLInputElement;
  const confirmPasswordInput = (await findByTestId(
    'confirm-password'
  )) as HTMLInputElement;
  const button = (await findByTestId('register')) as HTMLButtonElement;
  return { emailInput, passwordInput, confirmPasswordInput, button };
};

describe('RegisterForm', () => {
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
    expect(button).toBeDisabled();
    expect(emailInput.value).toBe('email');
  });

  test('should fail to submit -- pwd is not equal to confirm-pwd', async () => {
    const {
      emailInput,
      passwordInput,
      confirmPasswordInput,
    } = await getFields();
    fireEvent.change(emailInput, { target: { value: 'example@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1234!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'notTheSame' } });
    // expect(button).toBeDisabled();
  });

  // test for pwd requirements
});

import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import StorageService from '../../../services/StorageService';
import { ILoginResponse } from '../../../services/models/user/ILoginResponse';

beforeEach(() => {
  fetchMock.resetMocks();
  StorageService.removeToken();
});

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

  test('should submit wrong user', async () => {
    const { component } = renderLoginForm();
    const { findByTestId } = component;

    const passwordInput = (await findByTestId('password')) as HTMLInputElement;
    const emailInput = (await findByTestId('email')) as HTMLInputElement;
    const button = screen.getByText(/shell.login/i)

    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    fireEvent.change(emailInput, { target: { value: 'email' } });

    fetchMock.mockResponseOnce(JSON.stringify("false"));

    act(() => {
      fireEvent.click(button);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.milou.io/user/login",
      expect.objectContaining( {"body": "{\"email\":\"email\",\"password\":\"pwd\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "POST"}),
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
    await waitFor(() =>{
      expect(screen.getByText(/error.invalidEmailOrPassword/i)).toBeInTheDocument()
      })
  });

  test('should submit registered user', async () => {
    const { component, setUserState} = renderLoginForm();
    const { findByTestId } = component;

    const passwordInput = (await findByTestId('password')) as HTMLInputElement;
    const emailInput = (await findByTestId('email')) as HTMLInputElement;
    const button = screen.getByText(/shell.login/i)

    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    fireEvent.change(emailInput, { target: { value: 'email' } });

    const mock: ILoginResponse = {
      token: 'abcd',
      user: {
        id: 'test@milo.de',
        email: 'test@milo.de',
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mock));

    act(() => {
      fireEvent.click(button);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.milou.io/user/login",
      expect.objectContaining( {"body": "{\"email\":\"email\",\"password\":\"pwd\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "POST"}),
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(setUserState).toHaveBeenCalledTimes(1)
    })
  });
});

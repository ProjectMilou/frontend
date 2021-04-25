import {
  fireEvent,
  Matcher,
  MatcherOptions,
  render,
  waitFor,
  waitForOptions,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import RegisterForm, { RegisterFormProps } from './RegisterForm';

const defaultProps = {
  onSuccess: jest.fn(),
  onFail: jest.fn(),
  goToLogin: jest.fn(),
  login: {
    email: 'email@milou.de',
    password: 'Password1234!',
    confirmPassword: 'Password1234!',
  },
  setLogin: jest.fn(),
};

const fetchContaining = {
  body: '{"email":"email@milou.de","password":"Password1234!"}',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
};

beforeEach(() => {
  fetchMock.resetMocks();
});

const renderRegisterForm = (newProps?: Partial<RegisterFormProps>) => {
  const props = { ...defaultProps, ...newProps };
  return {
    component: render(<RegisterForm {...props} />),
    ...props,
  };
};

const getFields = async (
  findByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    ForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>
) => {
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
    const { component } = await renderRegisterForm();
    const { findByTestId } = component;
    const { emailInput, passwordInput, confirmPasswordInput } = await getFields(
      findByTestId
    );
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test('should not be able to submit -- invalid email address', async () => {
    const { component } = await renderRegisterForm({
      login: {
        email: 'invalid email address',
        password: 'ValidPassword1!',
        confirmPassword: 'ValidPassword1!',
      },
    });
    const { findByTestId } = component;
    const { emailInput, button } = await getFields(findByTestId);

    fireEvent.blur(emailInput);
    expect(emailInput.getAttribute('aria-invalid')).toBe('true');
    expect(button).toBeDisabled();
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'valid@email.de' } });
    });
    expect(emailInput.value).toBe('valid@email.de');
    expect(emailInput.getAttribute('aria-invalid')).toBe('false');
  });

  test('should not be able to submit -- pwd is not equal to confirm-pwd', async () => {
    const { component } = await renderRegisterForm({
      login: {
        email: 'email@milou.de',
        password: 'Password1234!',
        confirmPassword: '',
      },
    });
    const { findByTestId } = component;
    const { confirmPasswordInput, button } = await getFields(findByTestId);

    expect(button).toBeDisabled();
    fireEvent.blur(confirmPasswordInput);
    expect(confirmPasswordInput.getAttribute('aria-invalid')).toBe('true');
  });

  test('should successfully submit', async () => {
    const { component, onSuccess } = await renderRegisterForm();
    const { findByTestId } = component;
    const { passwordInput, button } = await getFields(findByTestId);

    fetchMock.mockResponseOnce('success');
    act(() => {
      userEvent.type(passwordInput, 'Password1234!');
    });
    fireEvent.click(button);
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.milou.io/user/register',
      expect.objectContaining(fetchContaining)
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  test('should fail to submit', async () => {
    const { component, onFail } = await renderRegisterForm();
    const { findByTestId } = component;
    const { passwordInput, button } = await getFields(findByTestId);

    fetchMock.mockResponseOnce('failed', { status: 400 });
    act(() => {
      userEvent.type(passwordInput, 'Password1234!');
    });
    fireEvent.click(button);
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.milou.io/user/register',
      expect.objectContaining(fetchContaining)
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onFail).toHaveBeenCalledTimes(1);
    });
  });

  test('should open new tab on click', async () => {
    const { component } = await renderRegisterForm();
    const { findByRole } = component;
    const link = await findByRole('link');
    global.open = jest.fn();
    fireEvent.click(link);
    expect(global.open).toBeCalled();
  });

  test('should open new tab on keydown', async () => {
    const { component } = await renderRegisterForm();
    const { findByRole } = component;
    const link = await findByRole('link');
    global.open = jest.fn();
    fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
    expect(global.open).toBeCalled();
  });
});

import {
  fireEvent,
  Matcher,
  MatcherOptions,
  render,
  waitForOptions,
} from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import PasswordField, { PasswordFieldProps } from './PasswordField';

const defaultProps = {
  hasError: { email: '', password: '', confirmPassword: '' },
  setError: jest.fn(),
  login: {
    password: 'pwd',
    confirmPassword: 'pwd-valid',
  },
  handleChange: jest.fn(),
};

const renderPasswordField = (newProps?: Partial<PasswordFieldProps>) => {
  const props = { ...defaultProps, ...newProps };
  return {
    component: render(<PasswordField {...props} />),
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
  const password = (await findByTestId('password')) as HTMLInputElement;
  const confirmPassword = (await findByTestId(
    'confirm-password'
  )) as HTMLInputElement;
  return { password, confirmPassword };
};

describe('PasswordField', () => {
  test('should render password and confirm-password fields', async () => {
    const { component } = renderPasswordField();
    const { findByTestId } = component;
    const { password, confirmPassword } = await getFields(findByTestId);

    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
  });

  test('should render valid email and password fields', async () => {
    const { component } = renderPasswordField();
    const { findByTestId } = component;
    const { password, confirmPassword } = await getFields(findByTestId);
    expect(password.getAttribute('aria-invalid')).toBe('false');
    expect(confirmPassword.getAttribute('aria-invalid')).toBe('false');
  });

  test('should render input', async () => {
    const { component, handleChange } = renderPasswordField({
      hasError: { email: '', password: 'error', confirmPassword: 'error' },
    });
    const { findByTestId } = component;
    const { password, confirmPassword } = await getFields(findByTestId);

    expect(password.getAttribute('aria-invalid')).toBe('true');
    expect(confirmPassword.getAttribute('aria-invalid')).toBe('true');
    fireEvent.change(password, { target: { value: 'pwd' } });
    fireEvent.change(confirmPassword, { target: { value: 'pwd-2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('should change visibility -- password', async () => {
    const { component } = renderPasswordField();
    const { findByTestId } = component;
    const visibilityButton = await findByTestId('password-visibility');
    userEvent.click(visibilityButton);
    expect(component).toMatchSnapshot();
  });

  test('should change visibility -- confirm-password', async () => {
    const { component } = renderPasswordField();
    const { findByTestId } = component;
    const visibilityButton = await findByTestId('confirm-password-visibility');
    userEvent.click(visibilityButton);
    expect(component).toMatchSnapshot();
  });

  test('should set error on confirm-password', async () => {
    const { component, setError } = renderPasswordField({
      hasError: {
        email: '',
        password: 'password',
        confirmPassword: 'password-confirmed',
      },
    });
    const { findByTestId } = component;
    const { confirmPassword } = await getFields(findByTestId);
    fireEvent.blur(confirmPassword);
    expect(setError).toBeCalled();
    expect(component).toMatchSnapshot();
  });
});

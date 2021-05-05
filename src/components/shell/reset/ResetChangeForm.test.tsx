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
import ResetChangeForm, { ResetChangeFormProps } from './ResetChangeForm';

const defaultProps = {
  onSuccess: jest.fn(),
  onFailure: jest.fn(),
  id: '123',
  token: 'token',
};

beforeEach(() => {
  fetchMock.resetMocks();
});

const renderWindow = (newProps?: Partial<ResetChangeFormProps>) => {
  const props = { ...defaultProps, ...newProps };
  return {
    component: render(<ResetChangeForm {...props} />),
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
  const passwordInput = (await findByTestId('password')) as HTMLInputElement;
  const confirmPasswordInput = (await findByTestId(
    'confirm-password'
  )) as HTMLInputElement;
  return { passwordInput, confirmPasswordInput };
};

describe('ResetChangeForm', () => {
  test('should render input fields', async () => {
    const { component } = await renderWindow();
    const { findByTestId } = component;
    const { passwordInput, confirmPasswordInput } = await getFields(
      findByTestId
    );
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test('should not be able to submit -- pwd is not equal to confirm-pwd', async () => {
    const { component } = await renderWindow();
    const { findByTestId, getAllByRole } = component;
    const { confirmPasswordInput } = await getFields(findByTestId);
    const button = getAllByRole('button');

    expect(button[button.length - 1]).toBeDisabled();
    act(() => {
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'Password1234' },
      });
    });
    fireEvent.blur(confirmPasswordInput);
    expect(confirmPasswordInput.getAttribute('aria-invalid')).toBe('true');
  });

  test('should successfully submit', async () => {
    const { component, onSuccess } = await renderWindow();
    const { findByTestId, getAllByRole } = component;
    const { passwordInput, confirmPasswordInput } = await getFields(
      findByTestId
    );
    const button = getAllByRole('button');

    fetchMock.mockResponseOnce('success');
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'Password1234!' } });
    });
    act(() => {
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'Password1234!' },
      });
    });

    fireEvent.click(button[button.length - 1]);
    expect(
      window.fetch
    ).toHaveBeenCalledWith('https://api.milou.io/user/reset/change/123/token', {
      body: '{"password":"Password1234!"}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  test('should fail to submit', async () => {
    const { component, onFailure } = await renderWindow();
    const { findByTestId, getAllByRole } = component;
    const { passwordInput, confirmPasswordInput } = await getFields(
      findByTestId
    );
    const button = getAllByRole('button');

    fetchMock.mockResponseOnce('failed', { status: 400 });
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'Password1234!' } });
    });
    act(() => {
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'Password1234!' },
      });
    });

    fireEvent.click(button[button.length - 1]);
    expect(
      window.fetch
    ).toHaveBeenCalledWith('https://api.milou.io/user/reset/change/123/token', {
      body: '{"password":"Password1234!"}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onFailure).toHaveBeenCalledTimes(1);
    });
  });
});

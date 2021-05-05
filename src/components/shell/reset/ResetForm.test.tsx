import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import ResetForm from './ResetForm';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('ResetForm', () => {
  const renderWindow = () => {
    const props = {
      setSuccess: jest.fn(),
    };
    return {
      ...render(<ResetForm {...props} />),
      ...props,
    };
  };

  test('should submit email', async () => {
    renderWindow();
    const input = screen.getByLabelText('shell.email') as HTMLInputElement;
    const button = screen.getByText(/shell.reset.submit/i);
    act(() => {
      fireEvent.change(input, { target: { value: 'milou@test.com' } });
    });

    fetchMock.mockResponseOnce('{ok: true}', { status: 200 });

    await waitFor(() => {
      fireEvent.click(button);
    });
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.milou.io/user/reset/forgot',
      expect.objectContaining({
        body: '{"email":"milou@test.com"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  test('should show error', async () => {
    renderWindow();
    const input = screen.getByLabelText('shell.email') as HTMLInputElement;
    const button = screen.getByText(/shell.reset.submit/i);
    act(() => {
      fireEvent.change(input, { target: { value: 'milou@test.com' } });
    });

    fetchMock.mockResponseOnce('{ok: true}', { status: 400 });

    await waitFor(() => {
      fireEvent.click(button);
    });
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.milou.io/user/reset/forgot',
      expect.objectContaining({
        body: '{"email":"milou@test.com"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText(/error.invalidEmail/i)).toBeInTheDocument();
    });
  });

  test('should undo email error', async () => {
    renderWindow();
    const input = screen.getByLabelText('shell.email') as HTMLInputElement;
    const button = screen.getByText(/shell.reset.submit/i);

    await waitFor(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText(/error.invalidEmail/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(input, { target: { value: 'milou@test.com' } });
    });

    expect(screen.queryByText(/error.invalidEmail/i)).not.toBeInTheDocument();
  });

  test('should display text', () => {
    const { container } = renderWindow();
    expect(container).toMatchSnapshot();
  });
});

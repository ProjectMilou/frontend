import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ErrorMessage, { ErrorMessageProps } from './ErrorMessage';
import { AppError } from '../../Errors';

describe('ErrorMessage', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  const defaultProps: ErrorMessageProps = {
    error: new AppError('UNKNOWN'),
    retry: jest.fn(),
    messageKey: 'message',
  };

  const renderComponent = (newProps?: Partial<ErrorMessageProps>) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<ErrorMessage {...props} />),
      props,
    };
  };

  test('show and handle error message', () => {
    const { container, props, getByText } = renderComponent();
    expect(container).toMatchSnapshot();
    fireEvent.click(getByText('error.action.retry'));
    expect(props.retry).toHaveBeenCalled();
  });

  test('show error without message that cannot be handled', () => {
    const { container } = renderComponent({
      retry: undefined,
      messageKey: undefined,
    });
    expect(container).toMatchSnapshot();
  });

  test('handle authentication error', async () => {
    jest.useFakeTimers();

    const { container, props, getByText } = renderComponent({
      error: new AppError('AUTH_TOKEN_INVALID'),
    });
    expect(container).toMatchSnapshot();

    // does not call retry immediately
    fireEvent.click(getByText('error.action.login'));
    expect(props.retry).not.toHaveBeenCalled();
  });
});

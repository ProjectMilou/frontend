import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ErrorMessage, { ErrorMessageProps } from './ErrorMessage';

describe('ErrorMessage', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  const defaultProps: ErrorMessageProps = {
    error: 'UNKNOWN',
    handling: {
      buttonText: 'button',
      action: jest.fn(),
    },
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
    fireEvent.click(getByText(props.handling!.buttonText));
    expect(props.handling!.action).toHaveBeenCalled();
  });

  test('show error without message that cannot be handled', () => {
    const { container } = renderComponent({
      handling: undefined,
      messageKey: undefined,
    });
    expect(container).toMatchSnapshot();
  });
});

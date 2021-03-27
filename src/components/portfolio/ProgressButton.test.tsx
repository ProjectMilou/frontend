import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import ProgressButton, { ProgressButtonProps } from './ProgressButton';

describe('ProgressButton', () => {
  const defaultProps: PropsWithChildren<ProgressButtonProps> = {
    onClick: jest.fn(),
    children: 'Button',
  };

  const renderComponent = (
    newProps?: Partial<PropsWithChildren<ProgressButtonProps>>
  ) => {
    const props = { ...defaultProps, ...newProps };
    return {
      ...render(<ProgressButton {...props} />),
      props,
    };
  };

  test('render the button and handle click', () => {
    const { container, props } = renderComponent();
    expect(container).toMatchSnapshot();
    fireEvent.click(container.querySelector('button')!);
    expect(props.onClick).toHaveBeenCalled();
  });

  test('render the loading button', () => {
    const { container, props } = renderComponent({ loading: true });
    expect(container).toMatchSnapshot();
    fireEvent.click(container.querySelector('button')!);
    expect(props.onClick).not.toHaveBeenCalled();
  });
});

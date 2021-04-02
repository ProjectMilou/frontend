import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import Register from './Register';

describe('Register', () => {
  const renderRegister = () => {
    const props = {
      closePopUp: jest.fn(),
      openLoginPopUp: jest.fn(),
    };
    return {
      component: render(<Register {...props} />),
      ...props,
    };
  };
  test('should close popup window', async () => {
    const { component, closePopUp } = renderRegister();
    const { findByTestId } = component;

    const icon = await findByTestId('icon');
    userEvent.click(icon);
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });
});

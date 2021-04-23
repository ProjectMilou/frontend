import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
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

  test('should close popup window on keydown', async () => {
    const { component, closePopUp } = renderRegister();
    const { findByTestId } = component;
    const icon = await findByTestId('icon');
    fireEvent.keyDown(icon, { key: 'Enter', code: 'Enter' });
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  test('should open login window', async () => {
    const { closePopUp, openLoginPopUp } = renderRegister();
    const linkList = screen.getAllByRole('button');
    const link = linkList[linkList.length - 1];
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(closePopUp).toHaveBeenCalledTimes(1);
    expect(openLoginPopUp).toHaveBeenCalledTimes(1);
  });
});

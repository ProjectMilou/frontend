import { fireEvent, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import Reset from './Reset';

describe('Reset', () => {
  const renderReset = () => {
    const props = {
      closePopUp: jest.fn(),
    };
    return {
      component: render(<Reset {...props} />),
      ...props,
    };
  };

  const getIcon = async (
    component: RenderResult<typeof import('@testing-library/dom/types/queries')>
  ) => {
    const { findByTestId } = component;
    return findByTestId('icon');
  };

  test('should close popup window on click', async () => {
    const { component, closePopUp } = renderReset();
    const icon = await getIcon(component);
    userEvent.click(icon);
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  test('should close popup window on keydown', async () => {
    const { component, closePopUp } = renderReset();
    const icon = await getIcon(component);
    fireEvent.keyDown(icon, { key: 'Enter', code: 'Enter' });
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });
});

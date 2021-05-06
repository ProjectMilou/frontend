import * as React from 'react';
import { render } from '@testing-library/react';
import { navigate } from '@reach/router';
import LoginWrapper, { LoginWrapperProps } from './LoginWrapper';
import StorageService from '../../services/StorageService';
import { Context } from '../../state/context';

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

describe('LoginWrapper', () => {
  const mockDispatch = jest.fn();

  const createComponent = (
    props?: Partial<LoginWrapperProps>,
    state?: Partial<{ openLogin: boolean; loggedIn: boolean }>
  ) => {
    const defaultState = { openLogin: false, loggedIn: true };

    return (
      <Context.Provider
        value={{
          state: { ...defaultState, ...state },
          dispatch: mockDispatch,
        }}
      >
        <LoginWrapper {...props}>test content</LoginWrapper>
      </Context.Provider>
    );
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders content if user is logged in', () => {
    StorageService.setToken('dummy token');
    const { getByText } = render(createComponent());
    expect(getByText('test content')).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
  });

  test('opens login dialog if the user is not logged in', () => {
    StorageService.removeToken();
    const { queryByText } = render(createComponent({}, { loggedIn: false }));
    expect(queryByText('test content')).toBeNull();
    expect(mockDispatch).toBeCalledWith({ type: 'OPEN_LOGIN' });
  });

  test('renders content on successful login', () => {
    StorageService.removeToken();
    const { rerender, getByText } = render(
      createComponent({}, { loggedIn: false, openLogin: false })
    );
    expect(mockDispatch).toBeCalledWith({ type: 'OPEN_LOGIN' });
    rerender(createComponent({}, { loggedIn: false, openLogin: true }));
    rerender(createComponent({}, { loggedIn: true, openLogin: false }));
    expect(getByText('test content')).toBeInTheDocument();
  });

  test('navigates to fallback url if dialog is closed without logging in', () => {
    StorageService.removeToken();
    const { rerender } = render(
      createComponent({}, { loggedIn: false, openLogin: false })
    );
    expect(mockDispatch).toBeCalledWith({ type: 'OPEN_LOGIN' });
    rerender(createComponent({}, { loggedIn: false, openLogin: true }));
    rerender(createComponent({}, { loggedIn: false, openLogin: false }));
    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('navigates to fallback url on logout', () => {
    StorageService.removeToken();
    const { rerender } = render(
      createComponent({}, { loggedIn: true, openLogin: false })
    );
    rerender(createComponent({}, { loggedIn: false, openLogin: false }));
    expect(navigate).toHaveBeenCalledWith('/');
  });
});

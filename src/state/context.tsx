import React, { ReactNode, useReducer } from 'react';
import UserService from '../services/UserService';

type ContextType = {
  /** `true` if and only if the login dialog is currently open. */
  openLogin: boolean;
  /** `true` if and only if a user is currently logged in. */
  loggedIn: boolean;
};
const initialState = {
  openLogin: false,
  loggedIn: UserService.isLoggedIn(),
};

export const Context = React.createContext<{
  state: ContextType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: (s) => s,
});

export type Action = { type: 'OPEN_LOGIN' } | { type: 'CLOSE_LOGIN' };

const Reducer = (state: ContextType, action: Action): ContextType => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return {
        openLogin: true,
        loggedIn: UserService.isLoggedIn(),
      };

    case 'CLOSE_LOGIN':
      return {
        openLogin: false,
        loggedIn: UserService.isLoggedIn(),
      };
    default:
      return state;
  }
};

interface ContextProviderProps {
  children: ReactNode;
}
export function ContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

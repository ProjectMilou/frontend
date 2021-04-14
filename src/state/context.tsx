import React, { ReactNode, useReducer } from 'react';

type ContextType = {
  openLogin: boolean;
};
const initialState = {
  openLogin: false,
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
      };

    case 'CLOSE_LOGIN':
      return {
        openLogin: false,
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

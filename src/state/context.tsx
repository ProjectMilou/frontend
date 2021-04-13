import React, { useReducer } from 'react';

type ContextType = {
  openLogin: boolean;
};
const initialState = {
  openLogin: false,
};

export const Context = React.createContext<{
  state: ContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

export type Action = { type: 'OPEN_LOGIN' } | { type: 'CLOSE_LOGIN' };

const Reducer = (state: ContextType, action: Action) => {
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

export function ContextProvider({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export const useContext = () => React.useContext(Context);

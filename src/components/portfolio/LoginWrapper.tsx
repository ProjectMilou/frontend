import React from 'react';
import { navigate } from '@reach/router';
import { Context } from '../../state/context';

/**
 * Tracks the state of the login dialog.
 */
enum DialogState {
  /** The login dialog has not been opened yet. */
  Init,
  /** The login dialog is currently open. */
  Open,
  /** The login dialog was closed or the user is already logged in. */
  Closed,
}

export type LoginWrapperProps = {
  fallbackPath?: string;
};

/**
 * Renders `children` if a user is logged in and opens the login dialog otherwise.
 *
 * If the user closes the login dialog without logging in or logs out while this
 * wrapper is rendered, a navigation to `fallbackPath` is triggered.
 *
 * @param fallbackPath - Location to navigate to in case the user closes the dialog or logs out.
 * @param children - Content that is only rendered if a user is logged in.
 */
const LoginWrapper: React.FC<LoginWrapperProps> = ({
  fallbackPath = '/',
  children,
}) => {
  const { state, dispatch } = React.useContext(Context);
  const [dialogState, setDialogState] = React.useState<DialogState>(
    DialogState.Init
  );

  React.useEffect(() => {
    if (state.loggedIn) {
      // the user logged in successfully or was already logged in
      setDialogState(DialogState.Closed);
      return;
    }
    switch (dialogState) {
      case DialogState.Init:
        if (state.openLogin) {
          // login dialog was opened
          setDialogState(DialogState.Open);
        } else {
          // open the login dialog if it was not open before
          dispatch({ type: 'OPEN_LOGIN' });
        }
        break;
      case DialogState.Open:
        if (!state.openLogin) {
          // login dialog was closed without logging in
          setDialogState(DialogState.Closed);
        }
        break;
      case DialogState.Closed:
        if (!state.loggedIn) {
          // either the user closed the login dialog or logged out
          navigate(fallbackPath);
        }
        break;
      default:
    }
  }, [state.loggedIn, dialogState, state.openLogin, dispatch, fallbackPath]);

  return <>{state.loggedIn && children}</>;
};

export default LoginWrapper;

import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/placeholder.png';
import LoginForm from './LoginForm';
import WelcomeWindow from './WelcomeWindow';

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      backgroundColor: 'white',
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      position: 'relative',
    },
    iconLogo: {
      maxWidth: 150,
      display: 'block',
      margin: theme.spacing(1, 'auto'),
    },
    iconClear: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2),
      cursor: 'pointer',
    },
  })
);

export enum State {
  loggedIn,
  loggedOut,
  loading,
}

interface LoginProps {
  closePopUp: () => void;
  openRegisterPopUp: () => void;
  openForgotPasswordPopUp: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { closePopUp, openRegisterPopUp, openForgotPasswordPopUp } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { dialog, iconLogo, iconClear } = useStyles(theme);

  type State = 'loggedIn' | 'loggedOut';
  const initialState = localStorage.getItem('token') ? 'loggedIn' : 'loggedOut';
  const [userState, setUserState] = useState<State>(initialState);

  const openRegisterPopUpWindow = () => {
    closePopUp();
    openRegisterPopUp();
  };

  return (
    <div className={dialog}>
      <ClearIcon
        className={iconClear}
        color="primary"
        role="button"
        onClick={closePopUp}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            closePopUp();
            event.preventDefault();
          }
        }}
        tabIndex={0}
        data-testid="icon"
      />
      <img src={logo} alt="milou-logo" className={iconLogo} />

      {userState === 'loggedIn' && (
        <WelcomeWindow
          closePopUp={closePopUp}
          text={[t('shell.message.welcome.login'), t('shell.message.login')]}
        />
      )}

      {userState === 'loggedOut' && (
        <LoginForm
          openRegisterPopUpWindow={openRegisterPopUpWindow}
          openForgotPasswordPopUpWindow={openForgotPasswordPopUp}
          setUserState={() => setUserState('loggedIn')}
          closePopUp={closePopUp}
        />
      )}
    </div>
  );
};

Login.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openRegisterPopUp: PropTypes.func.isRequired,
  openForgotPasswordPopUp: PropTypes.func.isRequired,
};

export default Login;

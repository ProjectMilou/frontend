import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo1.png';
import RegisterForm from './RegisterForm';
import RegisterFailedWindow from './RegisterFailedWindow';
import RegisterConfirmWindow from './RegisterConfirmWindow';
import { UserInput } from '../utils';
import WelcomeWindow from '../login/WelcomeWindow';

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

interface RegisterProps {
  closePopUp: () => void;
  openLoginPopUp: () => void;
}

const Register: React.FC<RegisterProps> = (props) => {
  const { closePopUp, openLoginPopUp } = props;
  const theme = useTheme();
  const { dialog, iconClear, iconLogo } = useStyles(theme);

  type State =
    | 'registerForm'
    | 'registerSuccess'
    | 'registerFail'
    | 'registerConfirm';
  const [registerState, setRegisterState] = useState<State>('registerForm');

  const [login, setLogin] = useState<UserInput>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const goToLogin = () => {
    closePopUp();
    openLoginPopUp();
  };

  return (
    <div className={dialog}>
      <ClearIcon
        className={iconClear}
        color="primary"
        onClick={closePopUp}
        tabIndex={0}
        data-testid="icon"
      />
      <img src={logo} alt="milou-logo" className={iconLogo} />
      {registerState === 'registerForm' && (
        <RegisterForm
          onSuccess={() => {
            setRegisterState('registerConfirm');
          }}
          onFail={() => {
            setRegisterState('registerFail');
          }}
          goToLogin={goToLogin}
          login={login}
          setLogin={setLogin}
        />
      )}

      {registerState === 'registerConfirm' && (
        <RegisterConfirmWindow
          login={login}
          onFail={() => {
            setRegisterState('registerFail');
          }}
          registerConfirmed={() => {
            setRegisterState('registerSuccess');
          }}
        />
      )}

      {registerState === 'registerFail' && (
        <RegisterFailedWindow goToLogin={goToLogin} />
      )}

      {registerState === 'registerSuccess' && (
        <WelcomeWindow
          closePopUp={closePopUp}
          text={['Welcome to Milou!', 'You are registered.']}
        />
      )}
    </div>
  );
};

Register.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openLoginPopUp: PropTypes.func.isRequired,
};

export default Register;

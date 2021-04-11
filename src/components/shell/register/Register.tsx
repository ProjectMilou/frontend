import React, { useState } from 'react';
import {
  Box,
  Button,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Trans } from 'react-i18next';
import ClearIcon from '@material-ui/icons/Clear';
import { createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo1.png';
import RegisterForm from './RegisterForm';
import { UserInput } from '../utils';

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

  type State = 'registerForm' | 'registerConfirmed' | 'registerFailed';
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
            setRegisterState('registerConfirmed');
          }}
          onFail={() => {
            setRegisterState('registerFailed');
          }}
          goToLogin={goToLogin}
          login={login}
          setLogin={setLogin}
        />
      )}

      {registerState === 'registerConfirmed' && (
        <Box mt={3}>
          <Trans
            i18nKey="shell.message.confirmationEmail"
            components={{
              typography: <Typography align="center" />,
              break: <br />,
            }}
          />
        </Box>
      )}

      {registerState === 'registerFailed' && (
        <div>
          <Trans
            i18nKey="shell.message.haveAccount"
            components={{
              typography: <Typography align="center" />,
              button: (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 'auto', marginTop: '8px' }}
                  onClick={goToLogin}
                />
              ),
              box: <Box justifyContent="center" display="flex" my={0.5} />,
            }}
          />
        </div>
      )}
    </div>
  );
};

Register.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openLoginPopUp: PropTypes.func.isRequired,
};

export default Register;

import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
  useTheme,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText, DialogContent, DialogActions
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import logo from '../../../assets/images/logo1.png';

/* const url = process.env.URL_API
  if(!url){
    throw new Error("URL_API is missing")
  } */

const useStyles = makeStyles({
  dialog: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative',
  },
  iconLogo: {
    maxWidth: 150,
    display: 'block',
    margin: '10px auto',
  },
  iconClear: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    cursor: 'pointer',
  },
  button: {
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'none',
    padding: '0px',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '10px auto',
    display: 'block',
  },
});

interface RegisterProps {
  closePopUp: () => void;
  openLoginPopUp: () => void;
}

const Register: React.FC<RegisterProps> = (props) => {
  const { closePopUp, openLoginPopUp } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { dialog, iconClear, iconLogo, button } = useStyles(theme);

  const [login, setLogin] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  interface ErrorState {
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [hasError, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  } as ErrorState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    if (hasError[event.target.id as keyof ErrorState])
      setError({ ...hasError, [event.target.id]: '' });
    if (
      login.email !== '' &&
      event.target.id !== 'email' &&
      !EmailValidator.validate(login.email)
    ) {
      setError({ ...hasError, email: t('msg-email-invalid') });
    }
  };

  const handleSubmit = () => {
    if (!EmailValidator.validate(login.email)) {
      setError({
        ...hasError,
        email: [t('msg-email-invalid'), t('msg-try-again')].join(' '),
      });
      return;
    }

    if (login.password !== login.confirmPassword) {
      setError({
        ...hasError,
        confirmPassword: [t('msg-equal-pw-confirm'), t('msg-try-again')].join(
          ' '
        ),
      });
      setLogin({ ...login, confirmPassword: '' });
      return;
    }

    if (
      !/[a-z]{1}/.test(login.password) ||
      !/[A-Z]{1}/.test(login.password) ||
      !/[0-9]{1}/.test(login.password) ||
      !/[^a-zA-Z][^0-9]{1}/.test(login.password) ||
      !(login.password.length > 7)
    ) {

      setError({
        ...hasError,
        password: [
          t('msg-pw-invalid'),
          t('msg-pw-requirements'),
          t('msg-try-again'),
        ].join(' '),
      });
      return
    }

    console.log("correct")
    /*
    fetch(url.concat('/register'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...login }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
          setError({...login, email: [t("msg-email-invalid"), t("msg-try-again")].join(" ")})
          // or: setError({...login, password: [t("msg-pw-invalid"), t("msg-try-again")].join(" ")})
        }
        else{
          closePopUp()
        }
      });
      */
  };

  return (
    <div className={dialog}>
      <ClearIcon className={iconClear} color="primary" onClick={closePopUp} tabIndex={0}/>
      <img src={logo} alt="milou-logo" className={iconLogo} />
      <DialogContent>
        <TextField
          error={hasError.email !== ''}
          id="email"
          label={t('email')}
          onChange={handleChange}
          type="text"
          fullWidth
          helperText={hasError.email}
          style={{ margin: '10px 0' }}
          inputProps={{ "data-testid": "email" }}
        />
        <FormControl
          fullWidth
          error={hasError.password !== ''}
          style={{ margin: '10px 0' }}
        >
          <InputLabel htmlFor="password">{t('password')}</InputLabel>
          <Input
            id="password"
            type={showPassword.password ? 'text' : 'password'}
            value={login.password}
            onChange={handleChange}
            inputProps={{ "data-testid": "password" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                >
                  {showPassword.password ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{hasError.password}</FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          error={hasError.confirmPassword !== ''}
          style={{ margin: '10px 0' }}
        >
          <InputLabel htmlFor="password">{t('confirmPassword')}</InputLabel>
          <Input
            id="confirmPassword"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            value={login.confirmPassword}
            onChange={handleChange}
            inputProps={{ "data-testid": "confirm-password" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  {showPassword.confirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{hasError.confirmPassword}</FormHelperText>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          type="button"
          disabled={
            login.email === '' ||
            login.password === '' ||
            login.confirmPassword === ''
          }
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          data-testid="register"
        >
          {t('register')}
        </Button>
      </DialogActions>


      <Divider style={{ margin: '10px 0' }} />

      <Typography variant="body1" align="center">
        {t('msg-have-account')}{' '}
        <button
          className={button}
          type="button"
          onClick={() => {
            closePopUp();
            openLoginPopUp();
          }}
          onKeyDown={() => {
            closePopUp();
            openLoginPopUp();
          }}
        >
          {t('msg-link')}
        </button>
      </Typography>
    </div>
  );
};

Register.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openLoginPopUp: PropTypes.func.isRequired,
};

export default Register;

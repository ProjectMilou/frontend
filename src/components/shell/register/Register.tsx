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
  FormHelperText,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';

/* const url = process.env.URL_API
  if(!url){
    throw new Error("URL_API is missing")
  } */

const useStyles = makeStyles({
  background: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    backdropFilter: 'blur(2px)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  popUp: {
    maxWidth: '40%',
    minWidth: '350px',
    margin: 'auto',
    marginTop: '100px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative',
  },
  clearIcon: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    '&:hover': { cursor: 'pointer' },
  },
  form: {
    display: 'block',
    overflow: 'hidden',
    margin: '10px',
  },
  linkToLogin: {
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'none',
    padding: '0px',
    fontSize: '1rem',
    lineHeight: '1.5',
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
  const { background, popUp, clearIcon, form, linkToLogin } = useStyles(theme);

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
      !/[^a-zA-Z][^0-9]{1}/.test(login.password)
    ) {
      setError({
        ...hasError,
        password: [
          t('msg-pw-invalid'),
          t('msg-pw-requirements'),
          t('msg-try-again'),
        ].join(' '),
      });
      // return
    }

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
    <div
      className={background}
      role="presentation"
      onKeyDown={(e) => {
        closePopUp();
        e.stopPropagation();
      }}
      onClick={(e) => {
        closePopUp();
        e.stopPropagation();
      }}
    >
      <div
        role="presentation"
        className={popUp}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
      >
        <ClearIcon className={clearIcon} color="primary" onClick={closePopUp} />
        <Typography variant="h3" align="center">
          {t('register')}
        </Typography>
        <form className={form}>
          <TextField
            error={hasError.email !== ''}
            id="email"
            label={t('email')}
            onChange={handleChange}
            type="text"
            fullWidth
            helperText={hasError.email}
            style={{ margin: '10px 0' }}
          />
          <FormControl
            fullWidth
            error={hasError.password !== ''}
            style={{ margin: '10px 0' }}
          >
            <InputLabel htmlFor="password">
              {t('password')}
            </InputLabel>
            <Input
              id="password"
              type={showPassword.password ? 'text' : 'password'}
              value={login.password}
              onChange={handleChange}
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
            <InputLabel htmlFor="password">
              {t('confirmPassword')}
            </InputLabel>
            <Input
              id="confirmPassword"
              type={showPassword.confirmPassword ? 'text' : 'password'}
              value={login.confirmPassword}
              onChange={handleChange}
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
          >
            {t('register')}
          </Button>

          <Divider style={{ margin: '10px 0' }} />

          <Typography variant="body1" align="center">
            {t('msg-have-account-1')}{' '}
            <button
              className={linkToLogin}
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
              {t('msg-have-account-2')}
            </button>
            .
          </Typography>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openLoginPopUp: PropTypes.func.isRequired,
};

export default Register;

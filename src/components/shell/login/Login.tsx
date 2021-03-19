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

// WIP: refactor and styling


/*
const url = process.env.URL_API
if(!url){
  throw new Error("URL_API is missing")
}
*/

const useStyles = makeStyles({
  background: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    backdropFilter: 'blur(2px)',
  },
  popUpWindow: {
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
    cursor: 'pointer',
  },
  form: {
    display: 'block',
    overflow: 'hidden',
    margin: '10px',
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'none',
    padding: '0px',
    fontSize: '16px',
    lineHeight: '1.5',
  },
});

interface LoginProps {
  closePopUp: () => void;
  openRegisterPopUp: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { closePopUp, openRegisterPopUp } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { background, popUpWindow, clearIcon, form, link } = useStyles(theme);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  interface ErrorState {
    email: string;
    password: string;
  }
  const [hasError, setError] = useState({
    email: '',
    password: '',
  } as ErrorState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    if (hasError[event.target.id as keyof ErrorState])
      setError({ ...hasError, [event.target.id]: '' });
  };

  const handleSubmit = () => {
    if (login.email === '') {
      setError({ ...hasError, email: t('msg-text-missing') });
      return;
    }
    if (login.password === '') {
      setError({ ...hasError, email: t('msg-text-missing') });
      // return
    }

    /*
    fetch(url.concat('/login'), {
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

  const closeForm = (event: React.SyntheticEvent) => {
    closePopUp();
    event.stopPropagation();
  };

  const handleStopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  const openRegisterPopUpWindow = () => {
    closePopUp();
    openRegisterPopUp();
  };

  return (
    <div
      className={background}
      role="presentation"
      onClick={closeForm}
      onKeyDown={closeForm}
    >
      <div
        className={popUpWindow}
        role="presentation"
        onClick={handleStopPropagation}
        onKeyDown={handleStopPropagation}
      >
        <ClearIcon
          className={clearIcon}
          color="primary"
          onClick={closePopUp}
          tabIndex={0}
        />
        <Typography variant="h3" align="center">
          {t('login')}
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
            <InputLabel htmlFor="password">{t('password')}</InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={login.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{hasError.password}</FormHelperText>
          </FormControl>
          <button
            style={{ margin: 'auto', display: 'block' }}
            className={link}
            type="button"
            onClick={() => {
              alert('TODO');
            }}
          >
            {t('msg-forgot-pw')}
          </button>

          <Button
            style={{ margin: '10px 0' }}
            type="button"
            disabled={login.email === '' || login.password === ''}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            {t('login')}
          </Button>

          <Divider style={{ margin: '10px 0' }} />

          <Typography variant="body1" align="center">
            {t('msg-no-account-1')}
            <button
              className={link}
              type="button"
              onClick={openRegisterPopUpWindow}
              onKeyDown={openRegisterPopUpWindow}
            >
              {t('msg-no-account-2')}
            </button>
            .
          </Typography>

          <Typography variant="subtitle2" align="center">
            {t('disclaimer')}
          </Typography>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openRegisterPopUp: PropTypes.func.isRequired,
};

export default Login;

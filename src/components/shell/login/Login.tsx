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
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo1.png';

/*
const url = process.env.URL_API
if(!url){
  throw new Error("URL_API is missing")
}
*/

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
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '10px auto',
    display: 'block',
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
  const { dialog, iconLogo, iconClear, button } = useStyles(theme);

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
        tabIndex={0}
        data-testid="icon"
      />
      <img src={logo} alt="milou-logo" className={iconLogo} />
      <DialogContent>
        <TextField
          error={hasError.email !== ''}
          id="email"
          label={t('shell.email')}
          onChange={handleChange}
          type="text"
          fullWidth
          helperText={hasError.email}
          style={{ margin: '10px 0' }}
          inputProps={{ 'data-testid': 'email' }}
        />
        <FormControl
          fullWidth
          error={hasError.password !== ''}
          style={{ margin: '10px 0' }}
        >
          <InputLabel htmlFor="password">{t('shell.password')}</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={login.password}
            onChange={handleChange}
            inputProps={{ 'data-testid': 'password' }}
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
      </DialogContent>

      <button className={button} type="button">
        {t('shell.message.forgotPassword')}
      </button>

      <DialogActions>
        <Button
          type="button"
          disabled={login.email === '' || login.password === ''}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          data-testid="login"
        >
          {t('shell.login')}
        </Button>
      </DialogActions>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="body1" align="center">
        {t('shell.message.noAccount')}
        <button
          type="button"
          className={button}
          style={{ display: 'inline', fontSize: '16px' }}
          onClick={openRegisterPopUpWindow}
          onKeyDown={openRegisterPopUpWindow}
        >
          {t('shell.link')}
        </button>
      </Typography>
    </div>
  );
};

Login.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  openRegisterPopUp: PropTypes.func.isRequired,
};

export default Login;

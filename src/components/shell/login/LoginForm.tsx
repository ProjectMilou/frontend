import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';
import { UserService } from '../../../services/UserService';

const useStyles = makeStyles({
  errorMessage: {
    color: 'red',
    border: '1px solid red',
    padding: '5px',
    margin: '0px 24px',
  },
});

interface LoginFormProps {
  setUserState: () => void;
  openRegisterPopUpWindow: () => void;
  closePopUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { errorMessage } = useStyles(theme);
  const { openRegisterPopUpWindow, setUserState } = props;

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
  const [loginError, setLoginError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loginError) setLoginError(false);
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
      return;
    }

    UserService.login(login.email, login.password).then((ok) => {
      if (!ok) {
        setLoginError(true);
        return;
      }

      setUserState();
    });
  };

  return (
    <>
      {loginError && (
        <Typography variant="body1" className={errorMessage}>
          {t('error.invalidEmailOrPassword')} {t('error.retry')}
        </Typography>
      )}
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

      <LinkButton
        handleEvent={() => { }}
        text={t('shell.message.forgotPassword')}
        style={{ display: 'block', margin: '10px auto' }}
      />

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
        <LinkButton handleEvent={openRegisterPopUpWindow} />
      </Typography>
    </>
  );
};

export default LoginForm;

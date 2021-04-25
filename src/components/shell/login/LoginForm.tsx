import React, { useState } from 'react';
import {
  Button,
  createStyles,
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
  Theme,
  useTheme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { Trans, useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';
import UserService from '../../../services/UserService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main,
      border: theme.spacing(0.125, 'solid red'),
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 3),
    },
  })
);

interface LoginFormProps {
  setUserState: () => void;
  openRegisterPopUpWindow: () => void;
  openForgotPasswordPopUpWindow: () => void;
  closePopUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { errorMessage } = useStyles(theme);
  const {
    openRegisterPopUpWindow,
    openForgotPasswordPopUpWindow,
    setUserState,
  } = props;

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
    UserService.login(login.email, login.password).then((ok) => {
      if (!ok) {
        setLoginError(true);
        return;
      }
      setUserState();
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
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
        handleEvent={openForgotPasswordPopUpWindow}
        text={t('shell.message.forgotPassword')}
        style={{ display: 'block', margin: '8px auto', marginTop: '0px' }}
      />

      <DialogActions>
        <Button
          type="submit"
          disabled={login.email === '' || login.password === ''}
          variant="contained"
          color="primary"
          fullWidth
          data-testid="login"
        >
          {t('shell.login')}
        </Button>
      </DialogActions>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="body1" align="center">
        <Trans
          i18nKey="shell.message.noAccount"
          t={t}
          components={[<LinkButton handleEvent={openRegisterPopUpWindow} />]}
        />
      </Typography>
    </form>
  );
};

export default LoginForm;

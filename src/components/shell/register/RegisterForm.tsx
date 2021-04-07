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
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import * as EmailValidator from 'email-validator';
import { useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';
import { UserInput } from '../utils';
import { UserService } from '../../../services/UserService';

interface RegisterFormProps {
  onSuccess: () => void;
  onFail: () => void;
  goToLogin: () => void;
  login: UserInput;
  setLogin: (u: UserInput | ((u: UserInput) => UserInput)) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { t } = useTranslation();
  const { onSuccess, onFail, goToLogin, login, setLogin } = props;

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
  };

  const handleSubmit = () => {
    if (!EmailValidator.validate(login.email)) {
      setError({
        ...hasError,
        email: [t('error.invalidEmail'), t('error.retry')].join(' '),
      });
      return;
    }

    if (login.password.length < 8) {
      setError({
        ...hasError,
        password: [
          t('error.invalidPassword'),
          t('error.passwordRequirement.length'),
        ].join(' '),
      });
      return;
    }

    if (!/[a-z]{1}/.test(login.password)) {
      setError({
        ...hasError,
        password: [
          t('error.invalidPassword'),
          t('error.passwordRequirement.lowerCase'),
        ].join(' '),
      });
      return;
    }

    if (!/[A-Z]{1}/.test(login.password)) {
      setError({
        ...hasError,
        password: [
          t('error.invalidPassword'),
          t('error.passwordRequirement.upperCase'),
        ].join(' '),
      });
      return;
    }

    if (!/[0-9]{1}/.test(login.password)) {
      setError({
        ...hasError,
        password: [
          t('error.invalidPassword'),
          t('error.passwordRequirement.number'),
        ].join(' '),
      });
      return;
    }

    if (!/[^a-zA-Z][^0-9]{1}/.test(login.password)) {
      setError({
        ...hasError,
        password: [
          t('error.invalidPassword'),
          t('error.passwordRequirement.specialCharacter'),
        ].join(' '),
      });
      return;
    }

    if (login.password !== login.confirmPassword) {
      setError({
        ...hasError,
        confirmPassword: [t('error.confirmPassword'), t('error.retry')].join(
          ' '
        ),
      });
      setLogin({ ...login, confirmPassword: '' });
      return;
    }

    UserService.register(login.email, login.password).then((ok) =>
      ok ? onSuccess() : onFail()
    );
  };

  return (
    <>
      <DialogContent>
        <TextField
          error={hasError.email !== ''}
          id="email"
          label={t('shell.email')}
          onChange={handleChange}
          onBlur={() => {
            if (!EmailValidator.validate(login.email))
              setError({ ...hasError, email: t('error.invalidEmail') });
          }}
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
            type={!showPassword.password ? 'text' : 'password'}
            value={login.password}
            onChange={handleChange}
            inputProps={{ 'data-testid': 'password' }}
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
            {t('shell.confirmPassword')}
          </InputLabel>
          <Input
            id="confirmPassword"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            value={login.confirmPassword}
            onChange={handleChange}
            inputProps={{ 'data-testid': 'confirm-password' }}
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
            login.confirmPassword === '' ||
            Object.values(hasError).join('').length > 0
          }
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          data-testid="register"
        >
          {t('shell.register')}
        </Button>
      </DialogActions>

      <Divider style={{ margin: '10px 0' }} />

      <Typography variant="body1" align="center">
        {t('shell.question.haveAccount')} <LinkButton handleEvent={goToLogin} />
      </Typography>
    </>
  );
};
export default RegisterForm;

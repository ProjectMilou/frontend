import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import * as EmailValidator from 'email-validator';
import { Trans, useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';
import { UserInput, ErrorState } from '../utils';
import UserService from '../../../services/UserService';
import PasswordField from './PasswordField';

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
        <PasswordField
          hasError={hasError}
          login={login}
          handleChange={handleChange}
        />
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
        <Trans
          i18nKey="shell.question.haveAccount"
          t={t}
          components={[<LinkButton handleEvent={goToLogin} />]}
        />
      </Typography>
    </>
  );
};
export default RegisterForm;

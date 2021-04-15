import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { ErrorState, PasswordInput } from '../utils';

interface PasswordFieldProps {
  hasError: ErrorState;
  setError: React.Dispatch<React.SetStateAction<ErrorState>>;
  login: PasswordInput;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const { t } = useTranslation();
  const { hasError, setError, login, handleChange } = props;

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <>
      <FormControl
        fullWidth
        error={hasError.password !== ''}
        style={{ margin: '8px 0' }}
      >
        <InputLabel htmlFor="password">{t('shell.password')}</InputLabel>
        <Input
          id="password"
          type={showPassword.password ? 'text' : 'password'}
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
        style={{ margin: '8px 0' }}
      >
        <InputLabel htmlFor="password">{t('shell.confirmPassword')}</InputLabel>
        <Input
          id="confirmPassword"
          type={showPassword.confirmPassword ? 'text' : 'password'}
          value={login.confirmPassword}
          onChange={handleChange}
          onBlur={() => {
            if (login.password !== login.confirmPassword) {
              setError({
                ...hasError,
                confirmPassword: [
                  t('error.confirmPassword'),
                  t('error.retry'),
                ].join(' '),
              });
            }
          }}
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
    </>
  );
};

export default PasswordField;

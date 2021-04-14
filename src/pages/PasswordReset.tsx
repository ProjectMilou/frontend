import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  Paper,
  Typography,
  makeStyles,
  createStyles,
  useTheme,
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';

import PasswordField from '../components/shell/register/PasswordField';
import { ErrorState, UserInput } from '../components/shell/utils';

const useStyles = makeStyles((theme) =>
  createStyles({
    formular: {
      marginTop: theme.spacing(10),
      padding: theme.spacing(5, 3),
    },
  })
);
interface PasswordResetProps extends RouteComponentProps {
  id?: string;
  token?: string;
}

const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  const { id, token } = props;
  const { t } = useTranslation();
  const { formular } = useStyles(useTheme());

  const [hasError, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  } as ErrorState);

  const [login, setLogin] = useState<UserInput>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // TODO This is the copy-pasta antipattern and in dire need of refactoring
  // see components/shell/register/RegisterForm.tsc:35 ff
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    if (hasError[event.target.id as keyof ErrorState])
      setError({ ...hasError, [event.target.id]: '' });
  };

  const handleSubmit = () => {
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

    console.log(login);
  };

  return (
    <Container maxWidth="xs">
      <Paper className={formular}>
        <DialogContent>
          <Typography variant="h5" align="center">
            Please enter your new password
          </Typography>
          <PasswordField
            hasError={hasError}
            login={login}
            handleChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            submit
          </Button>
        </DialogActions>
      </Paper>
    </Container>
  );
};

export default PasswordReset;

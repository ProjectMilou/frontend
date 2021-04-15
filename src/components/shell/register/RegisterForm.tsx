import {
  Button,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import * as EmailValidator from 'email-validator';
import { Trans, useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';
import { UserInput, ErrorState } from '../utils';
import UserService from '../../../services/UserService';
import PasswordRequirement from './PasswordRequirement';
import { checkPasswordRequirements, IRequirements } from './util-password';
import PasswordField from './PasswordField';

interface RegisterFormProps {
  onSuccess: () => void;
  onFail: () => void;
  goToLogin: () => void;
  login: UserInput;
  setLogin: (u: UserInput | ((u: UserInput) => UserInput)) => void;
}

const useStyles = makeStyles({
  privacyLink: {
    display: 'inline',
    fontSize: '14px',
    margin: '0px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { t } = useTranslation();
  const { privacyLink } = useStyles();
  const { onSuccess, onFail, goToLogin, login, setLogin } = props;

  const [hasError, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  } as ErrorState);

  const [requirements, setRequirements] = useState({
    requirement: [
      {
        text: t('error.passwordRequirement.length'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.cases'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.number'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.specialCharacter'),
        done: false,
      },
    ],
  } as IRequirements);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // update state
    setLogin((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));

    // undo error message
    if (hasError[event.target.id as keyof ErrorState])
      setError({ ...hasError, [event.target.id]: '' });

    // check password requirements
    if (event.target.id === 'password')
      checkPasswordRequirements({
        password: event.target.value,
        setRequirements,
      });
  };

  const handleSubmit = () => {
    if (!EmailValidator.validate(login.email)) {
      setError({
        ...hasError,
        email: [t('error.invalidEmail'), t('error.retry')].join(' '),
      });
      return;
    }

    UserService.register(login.email, login.password).then((ok) =>
      ok ? onSuccess() : onFail()
    );
  };

  const openPrivacyTab = () => {
    window.open(window.location.href.concat('privacy'), '_blank');
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
          style={{ margin: '8px 0' }}
          inputProps={{ 'data-testid': 'email' }}
        />
        <PasswordField
          hasError={hasError}
          setError={setError}
          login={login}
          handleChange={handleChange}
        />
      </DialogContent>

      <Box mx="auto" pb={1} pl={3}>
        {requirements.requirement.map(({ text, done }, index) => (
          <PasswordRequirement
            key={text.concat(index.toString())}
            text={text}
            done={done}
          />
        ))}
      </Box>

      <Box px={2} py={1}>
        <Typography style={{ fontSize: '14px' }} align="center">
          <Trans
            i18nKey="shell.disclaimer"
            t={t}
            components={[
              <div
                className={privacyLink}
                role="link"
                aria-label="Privacy"
                tabIndex={0}
                onClick={() => openPrivacyTab()}
                onKeyDown={() => openPrivacyTab()}
              />,
            ]}
          />
        </Typography>
      </Box>

      <DialogActions>
        <Button
          type="button"
          disabled={
            login.email === '' ||
            Object.values(hasError).join('').length > 0 ||
            requirements.requirement.map((r) => r.done).some((done) => !done) ||
            login.password !== login.confirmPassword
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

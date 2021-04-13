import {
  Button,
  createStyles,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '@material-ui/core/Divider';
import validate from 'uuid-validate';
import LinkButton from '../LinkButton';
import { UserInput } from '../utils';
import UserService from '../../../services/UserService';

const useStyles = makeStyles((theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main,
      border: theme.spacing(0.125, 'solid red'),
      padding: theme.spacing(0.5),
      display: 'inline',
      marginBottom: theme.spacing(1),
    },
  })
);

interface RegisterFailedWindowProps {
  login: UserInput;
  onFail: () => void;
  registerConfirmed: () => void;
}

const RegisterFailedWindow: React.FC<RegisterFailedWindowProps> = (props) => {
  const { login, onFail, registerConfirmed } = props;
  const { t } = useTranslation();
  const { errorMessage } = useStyles();
  const [uuid, setUuid] = useState('');
  const [error, setError] = useState('');
  const [resend, setResend] = useState(false);

  const handleSubmit = () => {
    UserService.registerConfirm(uuid).then((ok) =>
      ok ? registerConfirmed() : setError('Invalid code. Please try again!')
    );
  };

  const onSuccess = () => {
    setResend(true);
    setError('');
    setUuid('');
  };

  return (
    <div>
      {resend && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body1" className={errorMessage}>
            {t('shell.message.resendEmail')}
          </Typography>
        </div>
      )}
      <Typography variant="body1" align="center">
        {t('shell.message.confirmationEmail')}
      </Typography>
      <DialogContent>
        <TextField
          error={error !== ''}
          id="code"
          label="Code"
          value={uuid}
          onChange={(event) => {
            if (resend) setResend(false);
            setUuid(event.target.value);
          }}
          onBlur={() => {
            if (!validate(uuid)) setError('Invalid code. Please try again!');
          }}
          type="text"
          fullWidth
          helperText={error}
          style={{ margin: '10px 0' }}
          inputProps={{ 'data-testid': 'input-uuid' }}
        />
      </DialogContent>

      <DialogActions>
        <Button
          type="button"
          disabled={uuid === ''}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          data-testid="button-confirm"
        >
          {t('shell.confirm')}
        </Button>
      </DialogActions>

      <Divider style={{ margin: '24px 0' }} />

      <Typography variant="body1" align="center">
        {t('shell.question.confirmationEmail')}
        <br />
        {t('shell.message.resend')}
        <LinkButton
          handleEvent={() =>
            UserService.register(login.email, login.password).then((ok) =>
              ok ? onSuccess() : onFail()
            )
          }
        />
        .
      </Typography>
    </div>
  );
};

export default RegisterFailedWindow;

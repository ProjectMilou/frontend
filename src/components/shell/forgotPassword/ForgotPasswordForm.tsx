import React, { useState } from 'react';
import {
  Button,
  createStyles,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UserService } from '../../../services/UserService';

const useStyles = makeStyles((theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main,
      border: theme.spacing(0.125, `solid ${theme.palette.error.main}`),
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 3),
    },
  })
);

interface ForgotPasswordFormProps {
  setSuccess: (v: boolean) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { errorMessage } = useStyles(theme);
  const [email, setEmail] = useState('');
  const [hasError, setError] = useState(false);
  const { setSuccess } = props;

  const handleSubmit = () => {
    if (email === '') {
      setError(true);
      return;
    }

    UserService.forgot(email)
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false));
  };
  return (
    <>
      {hasError && (
        <Typography variant="body1" className={errorMessage}>
          {t('error.invalidEmail')} {t('error.retry')}
        </Typography>
      )}
      <DialogContent>
        <Typography variant="body1" align="center">
          {t('shell.forgotPassword.reset')}
        </Typography>

        <TextField
          id="email"
          label={t('shell.email')}
          type="text"
          fullWidth
          style={{ margin: '10px 0' }}
          onChange={(event) => setEmail(event.target.value)}
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
          {t('shell.forgotPassword.submit')}
        </Button>
      </DialogActions>
    </>
  );
};

export default ForgotPasswordForm;

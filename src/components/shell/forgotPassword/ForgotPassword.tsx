import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  makeStyles,
  createStyles,
  useTheme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo1.png';
import { UserService } from '../../../services/UserService';

/*
const url = process.env.URL_API
if(!url){
  throw new Error("URL_API is missing")
}
*/
const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      backgroundColor: 'white',
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      position: 'relative',
    },
    iconLogo: {
      maxWidth: 150,
      display: 'block',
      margin: theme.spacing(1, 'auto'),
    },
    iconClear: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2),
      cursor: 'pointer',
    },
    errorMessage: {
      color: theme.palette.error.main,
      border: theme.spacing(0.125, `solid ${theme.palette.error.main}`),
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 3),
    },
    successMessage: {
      color: theme.palette.success.main,
      border: theme.spacing(0.125, `solid ${theme.palette.success.main}`),
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 3),
    },
  })
);

interface ForgotPasswordProps {
  closePopUp: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { closePopUp } = props;
  const theme = useTheme();
  const {
    dialog,
    iconLogo,
    iconClear,
    errorMessage,
    successMessage,
  } = useStyles(theme);
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [hasError, setError] = useState(false);
  const [hasSuccess, setSuccess] = useState(false);

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

      <Box mt={5}>
        {hasError && (
          <Typography variant="body1" className={errorMessage}>
            {t('error.invalidEmail')} {t('error.retry')}
          </Typography>
        )}
        {hasSuccess && (
          <Typography variant="body1" className={successMessage}>
            {t('shell.forgotPassword.tokenSent')}
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
      </Box>
    </div>
  );
};

ForgotPassword.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default ForgotPassword;

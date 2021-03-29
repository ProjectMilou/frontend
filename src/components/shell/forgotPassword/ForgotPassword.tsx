import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo1.png';

/*
const url = process.env.URL_API
if(!url){
  throw new Error("URL_API is missing")
}
*/

const useStyles = makeStyles({
  dialog: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative',
  },
  iconLogo: {
    maxWidth: 150,
    display: 'block',
    margin: '10px auto',
  },
  iconClear: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    cursor: 'pointer',
  },
  button: {
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'none',
    padding: '0px',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '10px auto',
    display: 'block',
  },
});

interface ForgotPasswordProps {
  closePopUp: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { closePopUp } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { dialog, iconLogo, iconClear, button } = useStyles(theme);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // TODO send request to the api for new token and show new form fields
    // to enter token and change password
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
        <Typography variant="body1" align="center">
          {t('shell.forgotPassword.reset')}
        </Typography>
        <DialogContent>
          <TextField
            id="email"
            label={t('shell.email')}
            type="text"
            fullWidth
            style={{ margin: '10px 0' }}
            inputProps={{ 'data-testid': 'email' }}
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

import React, { useState } from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo1.png';
import ForgotPasswordForm from './ResetForm';
import ForgotPasswordSuccessWindow from './ResetSuccessWindow';

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
  })
);

interface ForgotPasswordProps {
  closePopUp: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { closePopUp } = props;
  const theme = useTheme();
  const { dialog, iconLogo, iconClear } = useStyles(theme);
  const [hasSuccess, setSuccess] = useState(false);

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

      {hasSuccess ? (
        <ForgotPasswordSuccessWindow closePopUp={closePopUp} />
      ) : (
        <ForgotPasswordForm setSuccess={setSuccess} />
      )}
    </div>
  );
};

ForgotPassword.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default ForgotPassword;

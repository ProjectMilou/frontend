import React, { useState } from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/placeholder.png';
import ResetForm from './ResetForm';
import ResetSuccessWindow from './ResetSuccessWindow';

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

interface ResetProps {
  closePopUp: () => void;
}

const Reset: React.FC<ResetProps> = (props) => {
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
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            closePopUp();
            event.preventDefault();
          }
        }}
        tabIndex={0}
        data-testid="icon"
      />

      <img src={logo} alt="milou-logo" className={iconLogo} />

      {hasSuccess ? (
        <ResetSuccessWindow closePopUp={closePopUp} />
      ) : (
        <ResetForm setSuccess={setSuccess} />
      )}
    </div>
  );
};

Reset.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default Reset;

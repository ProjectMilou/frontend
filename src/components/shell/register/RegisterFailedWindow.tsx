import React from 'react';
import { Grow, makeStyles, Typography } from '@material-ui/core';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';

const useStyles = makeStyles({
  iconClear: {
    width: '100px',
    height: '100px',
    margin: 'auto',
    color: 'primary',
    display: 'block',
  },
});

interface RegisterFailedWindowProps {
  goToLogin: () => void;
}

const RegisterFailedWindow: React.FC<RegisterFailedWindowProps> = (props) => {
  const { goToLogin } = props;
  const { t } = useTranslation();
  const { iconClear } = useStyles();

  const showCheckmark = true;
  return (
    <div>
      <Typography variant="body1" align="center">
        {t('shell.message.haveAccount')}
        <LinkButton handleEvent={goToLogin} />.
      </Typography>
      <Grow in={showCheckmark} timeout={1000}>
        <HighlightOffIcon className={iconClear} color="primary" />
      </Grow>
    </div>
  );
};

export default RegisterFailedWindow;

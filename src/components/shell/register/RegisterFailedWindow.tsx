import React from 'react';
import { Grow, createStyles, makeStyles, Typography } from '@material-ui/core';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    iconClear: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: 'auto',
      color: theme.palette.primary.main,
      display: 'block',
    },
  })
);

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

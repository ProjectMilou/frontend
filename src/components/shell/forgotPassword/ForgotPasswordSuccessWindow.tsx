import React, { useEffect } from 'react';
import { createStyles, Grow, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const ForgotPasswordSuccessWindow: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="h5" align="center">
      {t('shell.forgotPassword.tokenSent')}
    </Typography>
  );
};

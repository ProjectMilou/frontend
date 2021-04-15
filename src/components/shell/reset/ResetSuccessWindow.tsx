import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface ResetSuccessWindowProps {
  closePopUp: () => void;
}

const ResetSuccessWindow: React.FC<ResetSuccessWindowProps> = (props) => {
  const { t } = useTranslation();
  const { closePopUp } = props;

  useEffect(() => {
    setTimeout(() => {
      closePopUp();
    }, 3000);
  });

  return (
    <Box my={3}>
      <Typography variant="h5" align="center">
        {t('shell.forgotPassword.tokenSent')}
      </Typography>
    </Box>
  );
};

export default ResetSuccessWindow;

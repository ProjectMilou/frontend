import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
// TODO: Screenshot the webform checkbox
import ImgInstruction from '../../../assets/images/analyse.png';

interface BankAddDialogProps {
  link: string;
}

const BankAddDialog: React.FC<BankAddDialogProps> = (props) => {
  const { link } = props;
  const { t } = useTranslation();

  return (
    <Box my={3}>
      <Typography align="center" variant="h5" gutterBottom>
        {t('shell.bank.add.dialog.headline')}
      </Typography>
      <Typography align="center" variant="body1" gutterBottom>
        {t('shell.bank.add.dialog.subheadline')}
      </Typography>
      <img
        width="100%"
        src={ImgInstruction}
        alt="Make sure to click the checkbox!"
      />

      <Button variant="contained" color="primary" fullWidth href={link}>
        {t('shell.bank.add.dialog.toWebform')}
      </Button>
    </Box>
  );
};

export default BankAddDialog;

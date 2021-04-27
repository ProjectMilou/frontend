import React from 'react';
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ImgInstruction from '../../../assets/images/instructions.png';

interface BankAddDialogProps {
  link: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    instruction: {
      width: '50%',
      display: 'block',
      margin: theme.spacing(2, 'auto'),
    },
  })
);

const BankAddDialog: React.FC<BankAddDialogProps> = (props) => {
  const { link } = props;
  const { t } = useTranslation();
  const style = useStyles();

  return (
    <Box my={3}>
      <Typography align="center" variant="h5" gutterBottom>
        {t('shell.bank.add.dialog.headline')}
      </Typography>
      <Typography align="center" variant="body1">
        {t('shell.bank.add.dialog.subheadline')}
      </Typography>
      <img
        className={style.instruction}
        src={ImgInstruction}
        alt={t('shell.bank.add.dialog.subheadline')}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        href={link}
        target="_blank"
      >
        {t('shell.bank.add.dialog.toWebform')}
      </Button>
    </Box>
  );
};

export default BankAddDialog;

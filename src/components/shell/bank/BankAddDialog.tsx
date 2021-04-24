import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
// TODO: Screenshot the webform checkbox
import ImgInstruction from '../../../assets/images/analyse.png';

interface BankAddDialogProps {
  link: string;
}

const BankAddDialog: React.FC<BankAddDialogProps> = (props) => {
  const { link } = props;

  return (
    <Box my={3}>
      <Typography align="center" variant="h5" gutterBottom>
        Make sure to click this checkbox!
      </Typography>
      <img
        width="100%"
        src={ImgInstruction}
        alt="Make sure to click the checkbox!"
      />

      <Button variant="contained" color="primary" fullWidth href={link}>
        To webform
      </Button>
    </Box>
  );
};

export default BankAddDialog;

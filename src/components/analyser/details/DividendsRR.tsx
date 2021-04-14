import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RRpass from './RRpass';


const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    pass: {
      color: "green"
    },
  })
);

type DividendsRRProps = {
  dividend: number
  payoutRatio: number
}

const DividendsRR: React.FC<DividendsRRProps> = ({ dividend, payoutRatio}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const hasDividend = dividend > 0
  

  return (
    
    <List >
      {hasDividend && <RRpass text="A dividend is paid" />}
    </List>
  
    
  );
};
export default DividendsRR;

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    pass: {
      color: palette.success.main,
      fontSize: 40,
    },
    text: typography.h5
  })
);

type RRpassProps = {
  text: string
}

const RRpass: React.FC<RRpassProps> = ({text}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (

    <ListItem>
    <ListItemIcon><CheckCircleOutlineIcon className={classes.pass}/></ListItemIcon>
    <ListItemText ><Typography className={classes.text}>{t(text)}</Typography></ListItemText>
    </ListItem>

  );
};
export default RRpass;

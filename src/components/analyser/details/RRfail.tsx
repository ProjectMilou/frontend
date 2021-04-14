import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    fail: {
      color: palette.error.main,
      fontSize: 40,
    },
    text: typography.h5
  })
);

type RRpassProps = {
  text: string
}

const RRfail: React.FC<RRpassProps> = ({text}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (

    <ListItem>
    <ListItemIcon><HighlightOffIcon className={classes.fail}/></ListItemIcon>
    <ListItemText className={classes.text}>{t(text)}</ListItemText>
    </ListItem>

  );
};
export default RRfail;

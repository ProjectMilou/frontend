import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    icon: {
      color: palette.error.main,
      fontSize: 40,
    },
    category: {
      ...typography.h6,
      color: palette.error.main,
      display: 'inline',
    },
    text: {
      ...typography.h6,
      marginLeft: 10,
      display: 'inline',
    },
  })
);

type RRpassProps = {
  category: string;
  text: string;
};

/**
 * Component to display a failing RR test
 *
 * @param category Category of test
 * @param text Fail text
 */
const RRfail: React.FC<RRpassProps> = ({ category, text }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ListItem>
      <ListItemIcon>
        <HighlightOffIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText>
        <>
          <Typography className={classes.category}>{t(category)}:</Typography>
          <Typography className={classes.text}>{t(text)}</Typography>
        </>
      </ListItemText>
    </ListItem>
  );
};
export default RRfail;

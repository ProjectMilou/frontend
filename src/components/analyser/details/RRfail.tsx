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
      ...typography.h5,
      color: palette.error.main,
      display: 'inline',
    },
    text: {
      ...typography.h5,
      marginLeft: 10,
      display: 'inline',
    },
  })
);

type RRpassProps = {
  category: string;
  text: string;
};

const RRfail: React.FC<RRpassProps> = ({ category, text }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ListItem>
      <ListItemIcon>
        <HighlightOffIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText>
        <Typography>
          <Typography className={classes.category}>{t(category)}:</Typography>
          <Typography className={classes.text}>{t(text)}</Typography>
        </Typography>
      </ListItemText>
    </ListItem>
  );
};
export default RRfail;

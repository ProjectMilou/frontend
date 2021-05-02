import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    icon: {
      color: palette.success.main,
      fontSize: 40,
    },
    category: {
      ...typography.h6,
      color: palette.success.main,
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
 * Component to display a successful RR test
 * 
 * @param category Category of test 
 * @param text Success text
 */
const RRpass: React.FC<RRpassProps> = ({ category, text }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleOutline className={classes.icon} />
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
export default RRpass;

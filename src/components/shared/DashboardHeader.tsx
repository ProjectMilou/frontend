import React from 'react';
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    header: {
      'background-color': palette.primary.dark,
    },
    text: {
      'font-size': '48px',
      color: palette.background.default,
      padding: '50px 0',
      minWidth: '50%',
      maxWidth: '1000px',
    },
  })
);

const DashboardHeader: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Container maxWidth="lg">
        <Typography className={classes.text}>{children}</Typography>
      </Container>
    </div>
  );
};

export default DashboardHeader;

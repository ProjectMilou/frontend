import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    'background-color': '#0D1B3B',
  },
  text: {
    'font-size': '48px',
    color: '#EEF1FB',
    padding: '50px 0',
    minWidth: '50%',
    maxWidth: '1000px',
  },
});

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

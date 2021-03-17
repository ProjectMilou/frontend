import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    height: '250px',
  },
  text: {
    'font-size': '35pt',
    width: '50%',
    margin: '50px',
  },
});

const DashboardHeader: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <p className={classes.text}>
        Diversifying and balancing your portfolio helps you to optimize the
        ratio between risk and return.
      </p>
    </div>
  );
};

export default DashboardHeader;

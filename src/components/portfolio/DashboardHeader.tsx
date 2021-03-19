import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    height: '350px',
    'background-color': '#122654',
  },
  text: {
    'font-size': '35pt',
    'color': '#EEF1FB',
    'padding-top': '5%',
    'padding-left' : '5%',
    width: '50%',
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

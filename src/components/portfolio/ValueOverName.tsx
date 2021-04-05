import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

// stylesheet for the valueOverName component
const useStyles = makeStyles(() =>
  createStyles({
    compContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    pWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    p: {
      margin: 0,
      alignSelf: 'center',
      // TODO: use theme color
      color: '#EEF1FB',
      // TODO: use theme weight and size?
      fontSize: '1rem',
      fontWeight: 600,
    },
  })
);

type ValueOverNameProps = {
  name: string;
  value: React.ReactNode;
  // below is needed e.g. for positions card
  secondValue?: React.ReactNode;
};

// this is a small component that displays a value above the name of the value
const ValueOverName: React.FC<ValueOverNameProps> = ({
  name,
  value,
  secondValue,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.compContainer}>
      <div className={classes.pWrapper}>
        <div className={classes.p}>{value}</div>
      </div>
      {/* conditional rendering for a second value over the name
      , e.g. used in position cards */}
      {secondValue && (
        <div className={classes.pWrapper}>
          <div className={classes.p}>{secondValue}</div>
        </div>
      )}
      <div className={classes.pWrapper}>
        <p className={classes.p}>{name}</p>
      </div>
    </div>
  );
};

export default ValueOverName;

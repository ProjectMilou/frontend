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
  value: string | JSX.Element;
  name: string;
  valueColor: string;
  // below are needed for positions
  secondValue?: string | JSX.Element;
  secondColor?: string;
};

// this is a small component that displays a value above the name of the value
const ValueOverName: React.FC<ValueOverNameProps> = ({
  value,
  name,
  valueColor,
  secondValue,
  secondColor,
}) => {
  const classes = useStyles(valueColor);

  return (
    <div className={classes.compContainer}>
      <div className={classes.pWrapper}>
        <p className={classes.p} style={{ color: valueColor }}>
          {value}
        </p>
      </div>
      {/* conditional rendering for a second colored value over the name
      , e.g. used in position cards */}
      {secondValue ? (
        <div className={classes.pWrapper}>
          <p className={classes.p} style={{ color: secondColor }}>
            {secondValue}
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className={classes.pWrapper}>
        <p className={classes.p}>{name}</p>
      </div>
    </div>
  );
};

export default ValueOverName;

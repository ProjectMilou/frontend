import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

// stylesheet for the valueOverName component
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    compContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
    },
    pWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    p: {
      margin: 0,
      alignSelf: 'center',
      color: palette.primary.contrastText,
      // TODO: use theme weight and size?
      fontSize: '1rem',
      fontWeight: 600,
    },
  })
);

// type declaration of props
type ValueOverNameProps = {
  value: string;
  name: string;
  valueColor: string;
};

// this is a small component that displays a value above the name of the value
const ValueOverName: React.FC<ValueOverNameProps> = ({
  value,
  name,
  valueColor,
}) => {
  const classes = useStyles(valueColor);

  return (
    <div className={classes.compContainer}>
      <div className={classes.pWrapper}>
        <p className={classes.p} style={{ color: valueColor }}>
          {value}
        </p>
      </div>
      <div className={classes.pWrapper}>
        <p className={classes.p}>{name}</p>
      </div>
    </div>
  );
};

export default ValueOverName;

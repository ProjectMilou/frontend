import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type VolatilityLineEntryProps = {
  volatilityValue: number;
};

const VolatilityLineEntry: React.FC<VolatilityLineEntryProps> = ({
  volatilityValue,
}) => {
  const useStyles = makeStyles({
    line: {
      position: 'absolute',
      height: '20px',
      width: '3px',
      backgroundColor: 'white',
    },
  });
  const classes = useStyles();

  return (
    <div
      className={classes.line}
      style={{
        left: `${Math.round((volatilityValue / 2.0) * 1000) / 10}%`,
      }}
    />
  );
};

export default VolatilityLineEntry;

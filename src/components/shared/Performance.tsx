import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type PerformanceProps = {
  value: number;
  size?: string;
};
// TODO change hard coded colors to palette
const useStyles = makeStyles<Theme, PerformanceProps, string>({
  performance: {
    fontSize: (props) => props.size || '24px',
    color: (props) => {
      switch (Math.sign(props.value)) {
        case -1:
          return '#B80C09';
        case 1:
          return '#3da97e';
        default:
          return '#b2b2b2';
      }
    },
  },
});

const Performance: React.FC<PerformanceProps> = (props) => {
  const { value } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator="."
      suffix=" %"
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator=","
      className={classes.performance}
    />
  );
};

export default Performance;

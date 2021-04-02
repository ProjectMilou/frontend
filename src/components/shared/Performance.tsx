import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type PerformanceProps = {
  value: number;
  size?: string;
  thousandSeperator?: string;
  decimalSeperator?: string;
};

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
  const { value, thousandSeperator, decimalSeperator } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={thousandSeperator || "."}
      suffix="&nbsp;%"
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator={decimalSeperator || ","}
      className={classes.performance}
    />
  );
};

export default Performance;

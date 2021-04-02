import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type ValuationProps = {
  value: number;
  size?: string;
};

const useStyles = makeStyles<Theme, ValuationProps, string>({
  euroCurrency: {
    fontSize: (props) => props.size || '24px',
    color: "#122654",
  },
});

const Valuation: React.FC<ValuationProps> = (props) => {
  const { value } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      suffix="x"
      decimalScale={1}
      fixedDecimalScale
      decimalSeparator="."
      className={classes.euroCurrency}
    />
  );
};

export default Valuation;

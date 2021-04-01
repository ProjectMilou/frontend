import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type EuroCurrencyProps = {
  value: number;
  size?: string;
};

const useStyles = makeStyles<Theme, EuroCurrencyProps, string>({
  euroCurrency: {
    fontSize: (props) => props.size || '24px',
  },
});

const EuroCurrency: React.FC<EuroCurrencyProps> = (props) => {
  const { value } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator="."
      suffix=" €"
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator=","
      className={classes.euroCurrency}
    />
  );
};

export default EuroCurrency;

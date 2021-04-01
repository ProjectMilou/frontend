import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type EuroCurrencyProps = {
  value: number;
  size?: string;
  fontWeight?: number;
  color?: string;
};

const useStyles = makeStyles<Theme, EuroCurrencyProps, string>({
  euroCurrency: {
    fontSize: (props) => props.size || '24px',
    fontWeight: (props)=> props.fontWeight || 400,
    color: (props)=> props.color || "#122654",
  },
});

const EuroCurrency: React.FC<EuroCurrencyProps> = (props) => {
  const { value } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      prefix="€"
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator="."
      className={classes.euroCurrency}
    />
  );
};

export default EuroCurrency;

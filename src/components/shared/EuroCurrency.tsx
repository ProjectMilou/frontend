import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type EuroCurrencyProps = {
  value: number;
  size?: string;
  decimalSeperator?: string;
  thousandSeperator?: string;
};

const useStyles = makeStyles<Theme, EuroCurrencyProps, string>({
  euroCurrency: {
    fontSize: (props) => props.size || '24px',
  },
});

const EuroCurrency: React.FC<EuroCurrencyProps> = (props) => {
  const { value, decimalSeperator, thousandSeperator } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={thousandSeperator || '.'}
      suffix="&nbsp;€"
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator={decimalSeperator || ','}
      className={classes.euroCurrency}
    />
  );
};

export default EuroCurrency;

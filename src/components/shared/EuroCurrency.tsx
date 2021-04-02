import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type EuroCurrencyProps = {
  value: number;
  size?: string;
  doPaint?: boolean;
};
// TODO change hard coded colors to palette
const useStyles = makeStyles<Theme, EuroCurrencyProps, string>({
  euroCurrency: {
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

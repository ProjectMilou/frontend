import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

export type EuroCurrencyProps = {
  value: number;
  size?: string;
  doPaint?: boolean;
  fontWeight?: number;
  color?: string;
  decimalSeperator?: string;
  thousandSeperator?: string;
};

// TODO change hard coded colors to palette
const useStyles = makeStyles<Theme, EuroCurrencyProps, string>({
  euroCurrency: {
    fontSize: (props) => props.size || '24px',
    color: (props) => {
      // priority: first check specific color, if not check doPaint (red/green, positive negative)
      // if none just inherit from parent
      if (props.color) return props.color;
      if (props.doPaint) {
        switch (Math.sign(props.value)) {
          case -1:
            return '#B80C09';
          case 1:
            return '#3da97e';
          default:
            return '#b2b2b2';
        }
      } else {
        return 'inherit';
      }
    },
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

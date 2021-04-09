import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

type StyledNumberFormatProps = {
  value: number;
  suffix: '&nbsp;€' | '&nbsp;%';
  size?: string;
  fontWeight?: number;
  paintJob?: boolean | string;
  decimalSeperator?: string;
  thousandSeperator?: string;
};

const useStyles = makeStyles<Theme, StyledNumberFormatProps, string>(
  (theme) => ({
    styledNumberFormat: {
      fontSize: (props) => props.size,
      fontWeight: (props) => props.fontWeight,
      color: (props) => {
        if (props.paintJob === true) {
          switch (Math.sign(props.value)) {
            case -1:
              return theme.palette.error.main;
            case 1:
              return theme.palette.success.main;
            default:
              return theme.palette.grey.A100;
          }
        } else if (props.paintJob) {
          return props.paintJob;
        } else {
          return undefined;
        }
      },
    },
  })
);

const StyledNumberFormat: React.FC<StyledNumberFormatProps> = (props) => {
  const { value, suffix, decimalSeperator, thousandSeperator } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={thousandSeperator || '.'}
      suffix={suffix}
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator={decimalSeperator || ','}
      className={classes.styledNumberFormat}
    />
  );
};

export default StyledNumberFormat;

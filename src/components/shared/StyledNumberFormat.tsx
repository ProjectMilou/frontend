import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

/**
 * Component for number formatting and optional styling
 *
 * @param value - number value that is being displayed
 * @param suffix - suffix for the formatted number value, use autocompletion of your IDE!
 * IMPORTANT: don't use curly braces around the suffix string
 *    WRONG: suffix={'&nbsp;€'}
 *    CORRECT: suffix='&nbsp;€'
 * @param size - optional parameter to set the font size, if left out inherits from parent
 * @param fontWeight - optional parameter to set the font weight, if left out inherits from parent
 * @param paintJob - optional parameter to color the value:
 *    - true will color green for positive values and red for negative values
 *    - if a hex-string is passed (e.g. '#fff') the text will be painted in that color
 *    - default/false is to inherit from parent (sets color to undefined)
 * @param decimalSeperator - optional, default is ","
 * @param thousandSeperator - optional, default is "."
 */
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

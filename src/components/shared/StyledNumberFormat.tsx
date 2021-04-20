import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme } from '@material-ui/core';

/**
 * Component for number formatting and optional styling
 *
 * @param value - number value that is being displayed
 * @param suffix - suffix for the formatted number value
 * IMPORTANT: don't use curly braces around the suffix string
 *    WRONG: suffix={'&nbsp;€'}
 *    CORRECT: suffix='&nbsp;€'
 * @param size - optional parameter to set the font size (in px), if left out inherits from parent
 * @param fontWeight - optional parameter to set the font weight, if left out inherits from parent
 * @param paintJob - optional parameter to color the value:
 *    - true will color green for positive values and red for negative values
 *    - if a hex-string is passed (e.g. '#fff') the text will be painted in that color
 *    - default/false is to inherit from parent (sets color to undefined)
 */
type StyledNumberFormatProps = {
  value: number;
  suffix?: '€' | '%';
  size?: string;
  fontWeight?: number;
  paintJob?: boolean | string;
};

const useStyles = makeStyles<Theme, StyledNumberFormatProps, string>(
  (theme) => ({
    styledNumberFormat: {
      fontSize: (props) => `${props.size}px`,
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
  const { value, suffix } = props;
  const classes = useStyles(props);

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator="."
      suffix={suffix ? '\u00a0'.concat(suffix) : undefined}
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator=","
      className={classes.styledNumberFormat}
      isNumericString
    />
  );
};

export default StyledNumberFormat;

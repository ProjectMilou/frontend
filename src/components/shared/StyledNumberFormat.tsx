import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles, Theme, Tooltip } from '@material-ui/core';

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
 * @param doLimit - optional if set to true the number will be limited in length
 */
type StyledNumberFormatProps = {
  value: number;
  suffix?: '€' | '%' | '$';
  size?: string;
  fontWeight?: number;
  paintJob?: boolean | string;
  doLimit?: boolean;
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
    tooltip: {
      maxWidth: 500,
      fontSize: '0.9rem',
      whiteSpace: 'pre-line',
    },
  })
);

const StyledNumberFormat: React.FC<StyledNumberFormatProps> = (props) => {
  const { value, suffix, doLimit } = props;
  const classes = useStyles(props);

  const nonLimitedFormat = (
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

  return (
    <>
      {doLimit && Math.abs(value) > 1000000 ? (
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title={nonLimitedFormat}
        >
          <NumberFormat
            value={value / 1000000}
            displayType="text"
            thousandSeparator="."
            suffix={suffix ? 'M\u00a0'.concat(suffix) : undefined}
            decimalScale={2}
            fixedDecimalScale
            decimalSeparator=","
            className={classes.styledNumberFormat}
            isNumericString
          />
        </Tooltip>
      ) : (
        <>{nonLimitedFormat}</>
      )}
    </>
  );
};

export default StyledNumberFormat;

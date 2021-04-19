import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

type StyleProps = {
  left: string;
  textColor: string;
  backgroundColor: string;
};

const useStyles = makeStyles<Theme, StyleProps>(() =>
  createStyles({
    volatilityValue: {
      position: 'absolute',
      left: (props) => props.left,
      display: 'flex',
      flexDirection: 'column',
    },
    line: {
      height: '3rem',
      width: '0.25rem',
      backgroundColor: (props) => props.backgroundColor,
    },
    text: {
      color: (props) => props.textColor,
      marginTop: '0.5rem',
      transform: 'translate(-50%, 0%)',
    },
  })
);

type LargeVolatilityLineEntryProps = {
  volatilityValue: number;
  name: string;
  textColor: string;
};

/**
 * This component represents the long line with text below it to be used in the volatility graph
 * In the portfolio view it represents the portfolios weighted average of all volatilities.
 * In the analyzer view it represents the singular stocks volatility.
 *
 * @param volatilityValue - The volatility which determines how far right the indicator is shifted on the graph
 * @param name - The string to be desplayed below the indicator line
 * @param textColor - The color of the text.
 * Please not that the indicator line color is determined by whether it is below (green) or above (red) the merket average
 */

const LargeVolatilityLineEntry: React.FC<LargeVolatilityLineEntryProps> = ({
  volatilityValue,
  name,
  textColor,
}) => {
  const { palette } = useTheme();

  const styleProps: StyleProps = {
    left: `${Math.round((volatilityValue / 2.0) * 1000) / 10}%`,
    textColor,
    backgroundColor:
      volatilityValue > 1 ? palette.error.main : palette.success.main,
  };

  const classes = useStyles(styleProps);

  return (
    <>
      <div className={classes.volatilityValue}>
        <div className={classes.line} />
        <div className={classes.text}>{name}</div>
      </div>
    </>
  );
};

export default LargeVolatilityLineEntry;

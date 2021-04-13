import React from 'react';
import { Tooltip } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    barIndicator: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '0.5rem',
      height: '120%',
      marginLeft: '-0.25rem',
    },
    indicatorLine: {
      height: '3rem',
      width: '0.2rem',
    },
    indicatorArrow: {
      margin: '-1rem',
    },
    tooltip: {
      fontSize: '0.8rem',
      fontWeight: 600,
      lineHeight: '1.2rem',
      whiteSpace: 'pre-line',
    },
  })
);

type AnalystBarIndicatorProps = {
  // the text to be shown when hovered over
  tooltipText: string;
  // a number between 0 and 100 that determines the position of the indicator
  // 0 - left ; 100 - right
  score: number;
  // the color of the indicator (incl arrow)
  color: string;
};

// this is an indicator for the red to green bar graph
const AnalystBarIndicator: React.FC<AnalystBarIndicatorProps> = ({
  tooltipText,
  score,
  color,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={<p className={classes.tooltip}>{tooltipText}</p>}>
      <div className={classes.barIndicator} style={{ left: `${score}%` }}>
        <div
          className={classes.indicatorLine}
          style={{ backgroundColor: color }}
        />
        <ArrowDropUpIcon
          className={classes.indicatorArrow}
          fontSize="large"
          style={{ color }}
        />
      </div>
    </Tooltip>
  );
};

export default AnalystBarIndicator;

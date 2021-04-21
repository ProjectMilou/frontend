import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  line: {
    position: 'absolute',
    height: '2rem',
    width: '0.25rem',
    transform: 'translate(0%, -50%)',
  },
  tooltip: {
    fontSize: '0.8rem',
    fontWeight: 600,
    lineHeight: '1.2rem',
    whiteSpace: 'pre-line',
  },
});

type VolatilityLineEntryProps = {
  volatilityValue: number;
  tooltipText: string;
  color: string;
};

/**
 * This component represents a small vertical line to be used in the volatility graph
 * On hover it shows the names of the stocks at a given point on the volatility graph.
 *
 * @param volatilityValue - The volatility which determines how far right the indicator is shifted on the graph
 * @param tooltipText - The string to be desplayed on hover
 * @param color - The color of the line.
 */

const VolatilityLineEntry: React.FC<VolatilityLineEntryProps> = ({
  volatilityValue,
  tooltipText,
  color,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={<p className={classes.tooltip}>{tooltipText}</p>}>
      <div
        className={classes.line}
        style={{
          left: `${Math.round((volatilityValue / 2.0) * 1000) / 10}%`,
          backgroundColor: color,
        }}
      />
    </Tooltip>
  );
};

export default VolatilityLineEntry;

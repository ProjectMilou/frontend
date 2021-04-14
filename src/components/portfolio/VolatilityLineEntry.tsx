import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

type VolatilityLineEntryProps = {
  volatilityValue: number;
  tooltipText: string;
  color: string;
};

const VolatilityLineEntry: React.FC<VolatilityLineEntryProps> = ({
  volatilityValue,
  tooltipText,
  color,
}) => {
  const useStyles = makeStyles(({ palette }: Theme) =>
    createStyles({
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
    })
  );

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

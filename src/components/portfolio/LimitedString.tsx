import React from 'react';
import { Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { limitString } from '../../portfolio/Helper';

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      maxWidth: 500,
      fontSize: '0.9rem',
      whiteSpace: 'pre-line',
    },
  })
);

type LimitedStringProps = {
  value: string;
  length?: number;
};

/**
 * This component is used to display a string that could possibly get very large.
 * It uses the {@link limitString helper method}
 * The full string will get displayed inside a tooltip
 *
 * @param value - The value you want to display (gets put inside a span)
 * @param length - The max length the final string should have, default is 20
 */
const LimitedString: React.FC<LimitedStringProps> = ({ value, length }) => {
  const maxLength = length || 20;
  const classes = useStyles();

  return (
    <>
      {value.length > maxLength ? (
        <Tooltip classes={{ tooltip: classes.tooltip }} title={value}>
          <span>{limitString(value, maxLength)}</span>
        </Tooltip>
      ) : (
        <span>{value}</span>
      )}
    </>
  );
};

export default LimitedString;

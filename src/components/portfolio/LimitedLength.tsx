import React from 'react';
import { Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { limitLength } from '../../portfolio/Helper';

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      maxWidth: 500,
      fontSize: '0.9rem',
      whiteSpace: 'pre-line',
    },
  })
);

type LimitedLengthProps = {
  value: string | number;
  length?: number;
};

const LimitedLength: React.FC<LimitedLengthProps> = ({ value, length }) => {
  const maxLength = length || 20;
  const classes = useStyles();

  return (
    <>
      {value.toString().length > maxLength ? (
        <Tooltip classes={{ tooltip: classes.tooltip }} title={value}>
          <span>{limitLength(value, maxLength)}</span>
        </Tooltip>
      ) : (
        <span>{value}</span>
      )}
    </>
  );
};

export default LimitedLength;

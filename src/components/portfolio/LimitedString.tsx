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

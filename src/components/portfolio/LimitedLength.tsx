import React from 'react';
import { Tooltip } from '@material-ui/core';
import { limitLength } from '../../portfolio/Helper';

type LimitedLengthProps = {
  value: string | number;
  length?: number;
};

const LimitedLength: React.FC<LimitedLengthProps> = ({ value, length }) => {
  const maxLength = length || 20;

  return (
    <>
      {value.toString().length > maxLength ? (
        <Tooltip title={value}>
          <span>{limitLength(value)}</span>
        </Tooltip>
      ) : (
        <span>{value}</span>
      )}
    </>
  );
};

export default LimitedLength;

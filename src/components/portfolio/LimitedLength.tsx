import React from 'react';
import { Tooltip } from '@material-ui/core';
import { limitNumber, limitString } from '../../portfolio/Helper';

type LimitedLengthProps = {
  value: string | number;
  length?: number;
};

const LimitedLength: React.FC<LimitedLengthProps> = ({ value, length }) => {
  const maxLength = length || 20;
  const type = typeof value;

  return (
    <>
      {value.toString().length > maxLength ? (
        <Tooltip title={type === "string" ? limitString(value) : limitNumber(value)}
      )}
    </>
  )
};

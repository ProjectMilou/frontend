import React from 'react';
import { Checkbox, Toolbar, FormControlLabel } from '@material-ui/core';
import InfoButton from './InfoButton';

export type KeyFigure = {
  title: string;
  definition: string;
  toggleFilter: (filter: string) => void;
  textColor: string;
};

export const OneKeyFigure: React.FC<KeyFigure> = ({
  title,
  definition,
  toggleFilter,
  textColor,
}) => {
  const [visible, setVisible] = React.useState<boolean>(true);

  const handleClick = () => {
    setVisible(!visible);
    toggleFilter(title);
  };

  return (
    <div>
      <Toolbar>
        <FormControlLabel
          style={{
            color: textColor,
          }}
          control={
            <Checkbox
              style={{
                color: textColor,
              }}
              checked={visible}
              onChange={handleClick}
            />
          }
          label={title}
        />
        <InfoButton title={definition}> </InfoButton>
      </Toolbar>
    </div>
  );
};

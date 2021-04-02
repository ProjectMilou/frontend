import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import {
  Checkbox,
  Toolbar,
  FormControlLabel,
  Tooltip,
} from '@material-ui/core';

export type KeyFigure = {
  title: string;
  definition: string;
  toggleFilter: (filter: string) => void;
  textColor: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    customSize: {
      maxWidth: 500,
    },
    root: {
      margin: '25px auto',
      minWidth: '50%',
    },
  })
);

export const OneKeyFigure: React.FC<KeyFigure> = ({
  title,
  definition,
  toggleFilter,
  textColor,
}) => {
  const classes = useStyles();
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
        <Tooltip
          title={definition}
          placement="top-start"
          classes={{ tooltip: classes.customSize }}
        >
          <InfoOutlined
            fontSize="small"
            style={{
              color: textColor,
            }}
          />
        </Tooltip>
      </Toolbar>
    </div>
  );
};
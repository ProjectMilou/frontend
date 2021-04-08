import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

export type Info = {
  title: string;
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
    infoText: {
      color: '#0D1B3B',
      fontSize: 'medium',
    },
  })
);

const InfoButton: React.FC<Info> = ({ title }) => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip
        title={title}
        placement="top-start"
        classes={{ tooltip: classes.customSize }}
      >
        <InfoOutlined className={classes.infoText} />
      </Tooltip>
    </div>
  );
};

export default InfoButton;

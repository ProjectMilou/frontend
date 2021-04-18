import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

export type InfoProps = {
  infotext: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: '0.25rem',
    },
    customSize: {
      maxWidth: 500,
    },
    infoText: {
      fontSize: 'medium',
    },
  })
);

const InfoButton: React.FC<InfoProps> = ({ infotext }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <Tooltip
        title={infotext}
        placement="top-start"
        classes={{ tooltip: classes.customSize }}
      >
        <InfoOutlined className={classes.infoText} />
      </Tooltip>
    </span>
  );
};

export default InfoButton;

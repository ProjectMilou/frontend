import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

export type InfoProps = {
  infotext: string;
}

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
      fontSize: 'medium',
    },
  })
);

const InfoButton: React.FC<InfoProps> = ({ infotext }) => {
  const classes = useStyles();

  return (
    <Tooltip
        title={infotext}
        placement="top-start"
        classes={{ tooltip: classes.customSize }}
      >
        <InfoOutlined className={classes.infoText} />
      </Tooltip>
  );
};

export default InfoButton;

import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

// InfoButton props type declaration
export type InfoProps = {
  infotext: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: '0.25rem',
      display: 'flex',
      alignItems: 'center',
    },
    customSize: {
      maxWidth: 500,
      fontSize: '0.9rem',
      whiteSpace: 'pre-line',
    },
    infoIcon: {
      fontSize: 'medium',
    },
  })
);

/**
 * @param infotext - Information
 * @return A info button which shows information when mouse hover on the info button
 */
const InfoButton: React.FC<InfoProps> = ({ infotext }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <Tooltip
        title={infotext}
        placement="top-start"
        classes={{ tooltip: classes.customSize }}
      >
        <InfoOutlined className={classes.infoIcon} />
      </Tooltip>
    </span>
  );
};

export default InfoButton;

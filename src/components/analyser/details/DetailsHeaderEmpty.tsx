import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    header: {
      backgroundColor: palette.primary.dark,
      width: '100%',
      height: 220,
    },
  })
);

/**
 * Empty Header component
 */
const DetailsHeaderEmpty: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.header} />;
};

export default DetailsHeaderEmpty;

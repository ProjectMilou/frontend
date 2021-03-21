import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    indented: {
        paddingLeft: theme.spacing(7),
    },
  }),
);

export default function Summary() {
  const classes = useStyles();

  return (
      <div>
          <h1 className={classes.indented}>
              1. Summary
            </h1>
        <Divider />
        <p className={classes.indented}> 
          Daimler AG, together its subsidiaries, develops and manufactures passenger cars, trucks, vans, and buses in Germany and internationally.
          </p>
      </div>
      
      
  );
}
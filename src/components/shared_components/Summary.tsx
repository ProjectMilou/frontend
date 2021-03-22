import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Radar from './Radar';

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
    rowC: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-evenly'
    }
  }),
);

export default function Summary() {
  const classes = useStyles();

  return (
      <div className={classes.indented}>
          <h1>1. Summary</h1>
        
        <div className={classes.rowC}>
          <p> 
            Daimler AG, together its subsidiaries, develops and manufactures passenger <br/> cars, trucks, vans, and buses in Germany and internationally.
          </p>
          <Radar/>
        </div>
        <Divider />
      </div>
    
      
      
  );
}
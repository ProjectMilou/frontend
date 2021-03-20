import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    
  },
  price: {
    paddingLeft: theme.spacing(7),
  },
  wknIsin: {
    
  },
  toolbar:{
    minHeight: 150,
    paddingLeft: theme.spacing(7),
  }
}));

const Bar: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <Typography variant="h4" className={classes.title}>
                Daimler
                <Typography variant="subtitle2" className={classes.wknIsin}>
                WKN: 710000 / ISIN: DE000710000
              </Typography>
              </Typography>
              <Typography variant="h4" className={classes.price}>
                68€
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
};

export default Bar;
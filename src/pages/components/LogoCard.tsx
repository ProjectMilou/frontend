import React from 'react';
import {
  Box,
  Grid,
  Typography,
  GridList,
  GridListTile,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import Media from './Media';
import img from '../media/180.png';
import img1 from '../media/getThumb.gif';
import img3 from '../media/start.png';
import img4 from '../media/tech-talents.png';
import img5 from '../media/tumlogo.png';
import manage from '../media/manage.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media1: {
      maxWidth: '450px',
      maxHeight: '390px',
      display: 'auto',
      objectFit: 'scale-down',
      padding: '10px',
    },
    media2: {
      width: '500px',
      height: '732px',
      padding: '50px',
      objectFit: 'scale-down',
    },
    logos: {
      maxWidth: '200px',
    },
    icon: {
      width: '20px',
      height: '20px',
    },
    divider: {
      light: false,
      variant: 'middle',
      marginInline: '200px',
      color: theme.palette.primary.dark,
    },
    box1: {
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    typography1: {
      color: theme.palette.primary.dark,
      fontSize: '24px',
    },
    boxMain: {
      paddingLeft: '300px',
      paddingRight: '300px',
      paddingTop: '100px',
      paddingBottom: '100px',
      backgroundColor: '#EEF1FB',
    },
    gridItem: {
      paddingInline: '100px',
    },
    smallIcon: {
      fontSize: '54px',
      color: theme.palette.secondary.light,
    },
  })
);

const LogoCard: React.FC = () => {
  const classes = useStyles();
  return (
    <Box bgcolor="#0c1a3a" color="white" py={8}>
      <Grid container>
        <Grid item xs container direction="column" alignItems="center">
          <Typography variant="h3">Our supporters</Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for your help!
          </Typography>
        </Grid>
      </Grid>
      <Box py={8}>
        <Grid container item alignItems="center" justify="center">
          <GridList cols={6} cellHeight={120} spacing={18}>
            <GridListTile>
              <Media image={img} className={classes.logos} />
            </GridListTile>
            <GridListTile>
              <Media image={img1} className={classes.logos} />
            </GridListTile>
            <GridListTile>
              <Media image={img5} className={classes.logos} />
            </GridListTile>
            <GridListTile>
              <Media image={manage} className={classes.logos} />
            </GridListTile>
            <GridListTile>
              <Media image={img4} className={classes.logos} />
            </GridListTile>
            <GridListTile>
              <Media image={img3} className={classes.logos} />
            </GridListTile>
          </GridList>
        </Grid>
      </Box>
    </Box>
  );
};

export default LogoCard;

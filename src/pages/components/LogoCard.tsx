import React from 'react';
import {
  Box,
  Grid,
  Typography,
  GridList,
  GridListTile,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import Media from './Media';
import img from '../../assets/images/180.png';
import img1 from '../../assets/images/getThumb.gif';
import img3 from '../../assets/images/start.png';
import img4 from '../../assets/images/tech-talents.png';
import img5 from '../../assets/images/tumlogo.png';
import manage from '../../assets/images/manage.png';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      maxWidth: '200px',
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
              <Media image={img} className={classes.logo} />
            </GridListTile>
            <GridListTile>
              <Media image={img1} className={classes.logo} />
            </GridListTile>
            <GridListTile>
              <Media image={img5} className={classes.logo} />
            </GridListTile>
            <GridListTile>
              <Media image={manage} className={classes.logo} />
            </GridListTile>
            <GridListTile>
              <Media image={img4} className={classes.logo} />
            </GridListTile>
            <GridListTile>
              <Media image={img3} className={classes.logo} />
            </GridListTile>
          </GridList>
        </Grid>
      </Box>
    </Box>
  );
};

export default LogoCard;

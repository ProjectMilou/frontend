import React from 'react';
import {
  Grid,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      backgroundColor: theme.palette.primary.main,
      padding: '80px',
      marginBottom: '60px',
      display: 'flex',
      justifyContent: 'center',
    },
    typography: {
      color: '#50aaff',
      fontWeight: 'bold',
      padding: '20px',
    },
    button: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: '10px',
      color: theme.palette.primary.contrastText,
      textTransform: 'none',
    },
    title: {
      fontWeight: 'bold',
      padding: '16px',
    },
  })
);

const GridColumnContainer: React.FC<{
  classNameGrid: string;
  title: string;
  content: string;
}> = ({ classNameGrid, title, content }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justify-content="center"
      className={classNameGrid}
    >
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" align="center">
        {content}
      </Typography>
    </Grid>
  );
};

export default GridColumnContainer;

import React from 'react';
import { Grid, Theme, createStyles, makeStyles } from '@material-ui/core';

import Media from './Media';
import GridColumnContainer from './GridColumnContainer';

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
  })
);

const GridRowContainer: React.FC<{
  image: string;
  classNameImage: string;
  classNameGrid: string;
  title: string;
  content: string;
  type: string;
}> = ({ image, classNameImage, classNameGrid, title, content, type }) => {
  const classes = useStyles();
  if (type === 'even') {
    return (
      <Grid
        container
        spacing={4}
        justify-content="center"
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <Media image={image} className={classNameImage} />
        </Grid>
        <GridColumnContainer
          classNameGrid={classNameGrid}
          title={title}
          content={content}
        />
      </Grid>
    );
  }
  return (
    <Grid
      container
      spacing={4}
      justify-content="center"
      direction="row"
      alignItems="center"
    >
      <GridColumnContainer
        classNameGrid={classNameGrid}
        title={title}
        content={content}
      />
      <Grid item>
        <Media image={image} className={classNameImage} />
      </Grid>
    </Grid>
  );
};
export default GridRowContainer;

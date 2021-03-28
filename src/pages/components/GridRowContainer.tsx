import React from 'react';
import { Grid } from '@material-ui/core';

import Media from './Media';
import GridColumnContainer from './GridColumnContainer';

const GridRowContainer: React.FC<{
  image: string;
  classNameImage: string;
  classNameGrid: string;
  title: string;
  content: string;
  type: string;
}> = ({ image, classNameImage, classNameGrid, title, content, type }) => {
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

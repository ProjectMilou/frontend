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
  titleClass: string;
}> = ({
  image,
  classNameImage,
  classNameGrid,
  title,
  content,
  type,
  titleClass,
}) => {
  if (type === 'even') {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        justify-content="space-between"
        spacing={10}
      >
        <Grid item style={{ width: '500px', height: '360px' }}>
          <Media image={image} className={classNameImage} />
        </Grid>
        <Grid item style={{ width: '500px', height: '360px' }}>
          <GridColumnContainer
            classNameGrid={classNameGrid}
            title={title}
            content={content}
            titleClass={titleClass}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      justify-content="space-between"
      justify="center"
      direction="row"
      alignItems="center"
      spacing={10}
    >
      <Grid item style={{ width: '500px', height: '360px' }}>
        <GridColumnContainer
          classNameGrid={classNameGrid}
          title={title}
          content={content}
          titleClass={titleClass}
        />
      </Grid>
      <Grid item style={{ width: '500px', height: '360px' }}>
        <Media image={image} className={classNameImage} />
      </Grid>
    </Grid>
  );
};
export default GridRowContainer;

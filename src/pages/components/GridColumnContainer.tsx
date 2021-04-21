import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const GridColumnContainer: React.FC<{
  classNameGrid: string;
  title: string;
  content: string;
  titleClass: string;
}> = ({ classNameGrid, title, content, titleClass }) => (
  <Grid
    item
    xs
    container
    direction="column"
    spacing={2}
    alignItems="center"
    justify="center"
    className={classNameGrid}
  >
    <div className={titleClass}>
      <Typography variant="h4" className={titleClass}>
        {title}
      </Typography>
    </div>

    <Typography variant="body1" align="center">
      {content}
    </Typography>
  </Grid>
);

export default GridColumnContainer;

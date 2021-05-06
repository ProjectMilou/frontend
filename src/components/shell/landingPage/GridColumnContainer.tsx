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
    alignItems="center"
    justify="center"
    className={classNameGrid}
    style={{ width: '500px', height: '260' }}
  >
    <div className={titleClass}>
      <Typography variant="h4" className={titleClass}>
        {title}
      </Typography>
    </div>
    <div style={{ maxWidth: '550px' }}>
      <Typography variant="body1" align="center">
        {content}
      </Typography>
    </div>
  </Grid>
);

export default GridColumnContainer;

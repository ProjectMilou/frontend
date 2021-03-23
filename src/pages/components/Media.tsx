import React from 'react';
import {
  CardMedia,
} from '@material-ui/core';

import { addSyntheticLeadingComment } from 'typescript';

const Media: React.FC<{image:string, style:Record<string, unknown>}> = ({image, style}) => (
  <CardMedia component="img" src={image} style={style}/>
);

export default Media;
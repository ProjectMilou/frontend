import React from 'react';
import { CardMedia } from '@material-ui/core';

const Media: React.FC<{ image: string; className: string }> = ({
  image,
  className,
}) => <CardMedia component="img" src={image} className={className} />;

export default Media;

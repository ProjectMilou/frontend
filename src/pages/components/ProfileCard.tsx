import React from 'react';
import { Typography, Box, Grid, Avatar } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

const ProfileCard: React.FC<{
  name: string;
  title: string;
  content: string;
  img: string;
}> = ({ name, title, content, img }) => (
  <Box p={6} justify-content="center">
    <Avatar
      src={img}
      variant="circle"
      style={{ width: '300px', height: '300px' }}
    />
    <Typography variant="h3" align="center">
      {name}
    </Typography>
    <Typography variant="h6" align="center">
      {title}
    </Typography>
    <Typography variant="body1" align="center">
      {content}
    </Typography>
    <Grid container direction="row" justify="center">
      <Grid item>
        <LinkedInIcon />
      </Grid>
      <Grid>
        <EmailIcon />
      </Grid>
    </Grid>
  </Box>
);

export default ProfileCard;

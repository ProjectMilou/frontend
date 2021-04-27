import React from 'react';
import { Button, Box, Grid, Typography, Input } from '@material-ui/core';

const NewsletterForm: React.FC = () => (
  <Box py={16} px={8}>
    <Grid container direction="row">
      <Grid item xs={6} container direction="column">
        <Typography variant="h4">Stay informed.</Typography>
        <Typography variant="body1">
          Sign-up for our newsletter to get more information and stay in
          contact.
        </Typography>
      </Grid>
      <Grid item>
        <form noValidate>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <div>
            <Input placeholder="Email Address" required />
          </div>
          <div style={{ marginTop: '6px' }}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  </Box>
);

export default NewsletterForm;

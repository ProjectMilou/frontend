import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';

const LandingPage: React.FC = () => (
<Box component="span">
<Container fixed>
<CardMedia>
  <img src="https://getmilou.de/wp-content/uploads/elementor/thumbs/2020-12-15-Logo-hell-p17eq5ztwznwc003uog4y2jecjf0xlb7ut5p5vmfus.png" title="2020-12-15 Logo hell" alt="2020-12-15 Logo hell"/>
</CardMedia>
<div className="elementor-widget-container">
  <h1 className="elementor-heading-title elementor-size-xxl">
    <b>Empower to invest.</b>
  </h1>
</div>
</Container>
</Box>
);
export default LandingPage;
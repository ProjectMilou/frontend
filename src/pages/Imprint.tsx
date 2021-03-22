import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';

const Imprint: React.FC<RouteComponentProps> = () => (
  <Box>
    <Typography variant="h2">Imprint</Typography>

    <Box>
      <Typography variant="h4">In Accordance with Section 5 TMG</Typography>
      <Typography variant="body1">
        Christoph Hanus
        <br />
        Max-Bill-Straße 67
        <br />
        80807 München
      </Typography>

      <Typography variant="h4">Contact</Typography>

      <Typography variant="body1">
        <a href="mailto:info@milou.io">info@milou.io</a>
      </Typography>
    </Box>

    <Box>
      <Typography variant="h3">Accountability for Content</Typography>
      <Typography variant="body1">
        The contents of our pages have been created with the utmost care.
        However, we cannot guarantee the content&apos;s accuracy, completeness
        or topicality. According to statutory provisions, we are furthermore
        responsible for our own content on these web pages. In this matter,
        please note that we are not obliged to monitor the transmitted or saved
        information of third parties, or investigate circumstances pointing to
        illegal activity. Our obligations to remove or block the use of
        information under generally applicable laws remain unaffected by this as
        per §§ 8 to 10 of the Telemedia Act (TMG).
      </Typography>
    </Box>

    <Box>
      <Typography variant="h3">Accountability for Links</Typography>
      <Typography variant="body1">
        Responsibility for the content of external links (to web pages of third
        parties) lies solely with the operators of the linked pages. No
        violations were evident to us at the time of linking. Should any legal
        infringement become known to us, we will remove the respective link
        immediately.
      </Typography>
    </Box>

    <Box>
      <Typography variant="h3">Copyright</Typography>
      <Typography variant="body1">
        Our web pages and their contents are subject to German copyright law.
        Unless expressly permitted by law, every form of utilizing, reproducing
        or processing works subject to copyright protection on our web pages
        requires the prior consent of the respective owner of the rights.
        Individual reproductions of a work are only allowed for private use. The
        materials from these pages are copyrighted and any unauthorized use may
        violate copyright laws.
      </Typography>
    </Box>
  </Box>
);

export default Imprint;

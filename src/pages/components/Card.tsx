import React from 'react';
import {
  Button,
  Container,
  Box,
  CardMedia,
  Grid,
  Typography,
  createMuiTheme,
  Icon,
  Divider,
  GridList,
  GridListTile,
  TextField,
  InputLabel,
  Input,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { addSyntheticLeadingComment } from 'typescript';

const Card: React.FC = () => (
<Box display="flex" flexDirection="row" 
        style={{ background: '#0c1a3a', marginLeft: 0}}
        justifyContent="center"
      >
        <Grid container direction="column" alignItems="center" wrap="nowrap">
          <Grid item>
            <img
              src="https://getmilou.de/wp-content/uploads/elementor/thumbs/2020-12-15-Logo-hell-p17eq5ztwznwc003uog4y2jecjf0xlb7ut5p5vmfus.png"
              title="2020-12-15 Logo hell"
              alt="2020-12-15 Logo hell"
            />
          </Grid>
          <Grid item>
            <Typography variant="h2">Empower to invest.</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Start now</Button>
          </Grid>
        </Grid>
      </Box>
);

export default Card;
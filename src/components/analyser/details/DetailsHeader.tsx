import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { symbol } from 'prop-types';
import * as API from '../../../analyser/APIClient';


export type DetailsProps = {
    details: API.Stock;
};

const useStyles = makeStyles({
    header: {
      'background-color': '#0D1B3B',
      minWidth: '100%',
    },
    text: {
      'font-size': '48px',
      color: '#EEF1FB',
      padding: '50px 0',
      minWidth: '50%',
      maxWidth: '1000px',
    },
  });

  const DetailsHeader: React.FC<DetailsProps> = ({details}) => {
    const classes = useStyles();
    return (
      <div className={classes.header}>
        <Container maxWidth="lg">
          <Typography className={classes.text}>
          {details.name} 
          </Typography>
        </Container>
        
      </div>
      
    );
  };
  
  export default DetailsHeader;
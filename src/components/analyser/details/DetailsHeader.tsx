import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { symbol } from 'prop-types';
import * as API from '../../../analyser/APIClient';
import EuroCurrency from '../EuroCurrency';

export type DetailsProps = {
    details: API.Stock;
};

const useStyles = makeStyles({
    header: {
      'background-color': '#0D1B3B',
    },
    text: {
      'font-size': '35px',
      color: '#EEF1FB',
      padding: '50px 0',
      minWidth: '50%',
      maxWidth: '1000px',
    },
    price: {
      paddingLeft: '6'
    }
  });

  const DetailsHeader: React.FC<DetailsProps> = ({details}) => {
    const classes = useStyles();
    return (
      <div className={classes.header}>
        <Container maxWidth="lg">
          <Typography className={classes.text}>
          {details.name}
           <EuroCurrency value={details.price} size='35px'/>
          </Typography>
        </Container>
      </div>
      
    );
  };
  
  export default DetailsHeader;
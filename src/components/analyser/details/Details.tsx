import React from 'react';
import {
  LinearProgress,
  makeStyles,
  Container,
} from '@material-ui/core';
import { ErrorCode } from '../../../Errors';
import * as API from '../../../analyser/APIClient';
import ErrorMessage from '../ErrorMessage';
import DetailsHeader from './DetailsHeader';
import KeyFigures from './KeyFigures';
import DetailsOverview from './DetailsOverview';

// props type declaration
export type DetailsProps = {
  // function to return to the dashboard
  token: string;
  back: () => void;
  symbol: string;
};

const useStyles = makeStyles({
  createButton: {
    marginTop: '25px',
  },
  dashboard: {
    margin: '25px auto',
  },
  mainContent: {
    margin: '25px auto',
  }
});

const Details: React.FC<DetailsProps> = ({token, symbol}) => {
  const [stockOverview, setStockOverview] = React.useState<API.Stock>();
  const [stockDetails, setStockDetails] = React.useState<API.StockDetails>();
  const [error, setError] = React.useState<ErrorCode | undefined>();

  const isMounted = React.useRef(true); 
  const fetch = async () => {
    setError(undefined);
    try {
      const sO = await API.stockOverview(token, symbol);
      const sD = await API.stockDetails(token, symbol)
      
      if (isMounted.current) {
        setStockOverview(sO);
        setStockDetails(sD);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e.message);
      }
    }
  };

  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <>
      
      {!stockOverview || !stockDetails && !error && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      
        {error && (
          <Container maxWidth="lg" className={classes.dashboard}>
          <ErrorMessage
            error={error}
            messageKey="analyser.dashboard.errorMessage"
            handling={
              error.startsWith('AUTH')
                ? {
                    buttonText: 'error.action.login',
                    action: async () => {
                      // TODO: go back to login
                    },
                  }
                : {
                    buttonText: 'error.action.retry',
                    action: fetch,
                  }
            }
          />
          </Container>
        )}
        {stockOverview && stockDetails && (
          <div>
            <DetailsHeader
              details={stockOverview}
            />
            <Container className={classes.mainContent}>
              <DetailsOverview
                stockOverview={stockOverview}
                stockDetails={stockDetails}
                />
              <KeyFigures/>
            </Container>
          </div>
        )}
    </>
  );
        };

export default Details;

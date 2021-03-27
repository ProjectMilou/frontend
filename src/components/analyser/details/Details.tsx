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
});

const Details: React.FC<DetailsProps> = ({token, symbol}) => {
  const [details, setDetails] = React.useState<API.Stock>();
  const [error, setError] = React.useState<ErrorCode | undefined>();

  const isMounted = React.useRef(true); 
  const fetch = async () => {
    setError(undefined);
    try {
      const s = await API.stockOverview(token, symbol);
      if (isMounted.current) {
        setDetails(s);
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
      
      {!details && !error && (
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
        {details && (
          <div>
            <DetailsHeader
              details={details}
            />
            <DetailsOverview
              positionCount={2}
              value={2}
              score={3}
              perf1y={0.02}
              perf7d={0.02}
              />
            <KeyFigures/>
          </div>
        )}
    </>
  );
        };

export default Details;

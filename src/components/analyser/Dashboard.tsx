import React from 'react';
import {
  LinearProgress,
  makeStyles,
  Container,
} from '@material-ui/core';
import * as API from '../../analyser/APIClient';
import { ErrorCode } from '../../Errors';
import ErrorMessage from './ErrorMessage';
import StockListOverview from './StockListOverview';
import DashboardHeader from './DashboardHeader';

export type DashboardProps = {
  token: string;
};

const useStyles = makeStyles({
  createButton: {
    marginTop: '25px',
  },
  dashboard: {
    margin: '25px auto',
  },
});

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const [error, setError] = React.useState<ErrorCode | undefined>();

  const isMounted = React.useRef(true);
  const fetch = async () => {
    setError(undefined);
    try {
      const s = await API.listStocks(token);
      if (isMounted.current) {
        setStocks(s);
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
      <DashboardHeader />
      {!stocks && !error && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      <Container maxWidth="lg" className={classes.dashboard}>
        {error && (
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
        )}
        {stocks && (
          <div>
            <StockListOverview
              stocks={stocks}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;

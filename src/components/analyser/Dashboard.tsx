import React from 'react';
import {
  LinearProgress,
  makeStyles,
  Container,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../portfolio/APIClient';
import { ErrorCode } from '../../Errors';
import ErrorMessage from './ErrorMessage';
import PortfolioOverview from './StockListOverview';
import DashboardHeader from './DashboardHeader';

export type DashboardProps = {
  token: string;
  selectPortfolio: (id: string) => void;
};

const useStyles = makeStyles({
  createButton: {
    marginTop: '25px',
  },
  dashboard: {
    margin: '25px auto',
  },
});

const Dashboard: React.FC<DashboardProps> = ({ token, selectPortfolio }) => {
  const [portfolios, setPortfolios] = React.useState<API.PortfolioOverview[]>();
  const [error, setError] = React.useState<ErrorCode | undefined>();

  const isMounted = React.useRef(true);
  const fetch = async () => {
    setError(undefined);
    try {
      const p = await API.portfolioOverview(token);
      if (isMounted.current) {
        setPortfolios(p);
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
      {!portfolios && !error && (
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
        {portfolios && (
          <div>
            <PortfolioOverview
              portfolios={portfolios}
              selectPortfolio={selectPortfolio}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;

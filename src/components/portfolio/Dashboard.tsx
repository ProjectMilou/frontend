import React from 'react';
import { LinearProgress, Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../portfolio/APIClient';
import { ErrorCode } from '../../Errors';
import ErrorMessage from './ErrorMessage';
import PortfolioOverview from './PortfolioOverview';

export type DashboardProps = {
  token: string;
  selectPortfolio: (id: string) => void;
};

const useStyles = makeStyles({
  createButton: {
    top: '2.5vh',
  },
  dashboard: {
    maxWidth: '1500px',
    margin: '25px auto',
  },
});

function fetch(
  token: string,
  setError: (error: ErrorCode | undefined) => void,
  setPortfolios: (portfolios: API.PortfolioOverview[] | undefined) => void
) {
  setError(undefined);
  API.portfolioOverview(token).then(setPortfolios).catch(setError);
}

const Dashboard: React.FC<DashboardProps> = ({ token, selectPortfolio }) => {
  const [portfolios, setPortfolios] = React.useState<API.PortfolioOverview[]>();
  const [error, setError] = React.useState<ErrorCode | undefined>();
  const { t } = useTranslation();

  React.useEffect(() => {
    fetch(token, setError, setPortfolios);
  }, [token]);

  const classes = useStyles();

  return (
    <>
      {!portfolios && !error && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      <div className={classes.dashboard}>
        {error && (
          <ErrorMessage
            error={error}
            messageKey="portfolio.dashboard.errorMessage"
            handling={
              ErrorCode[error].startsWith('AUTH')
                ? {
                    buttonText: 'error.action.login',
                    action: async () => {
                      // TODO: go back to login
                    },
                  }
                : {
                    buttonText: 'error.action.retry',
                    action: () => fetch(token, setError, setPortfolios),
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
            <Button
              className={classes.createButton}
              variant="outlined"
              color="primary"
            >
              {t('portfolio.dashboard.createPortfolio')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

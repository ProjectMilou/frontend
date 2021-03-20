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

const Dashboard: React.FC<DashboardProps> = ({ selectPortfolio }) => {
  const [portfolios, setPortfolios] = React.useState<API.PortfolioOverview[]>();
  const [error] = React.useState<ErrorCode>();
  const { t } = useTranslation();
  React.useEffect(() => {
    // TODO: Fetch portfolio list
    setTimeout(() => {
      setPortfolios([API.MockOverview, API.MockOverviewTwo]);
    }, 500);
  }, []);

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
                    action: () => {
                      // TODO: go back to login
                    },
                  }
                : {
                    buttonText: 'error.action.retry',
                    action: () => {
                      // TODO: Fetch portfolio list
                    },
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

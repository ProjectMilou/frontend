import React from 'react';
import { CircularProgress } from '@material-ui/core';
import * as API from '../../portfolio/APIClient';
import { ErrorCode } from '../../Errors';
import ErrorMessage from './ErrorMessage';
import PortfolioOverview from './PortfolioOverview';

export type DashboardProps = {
  token: string;
  selectPortfolio: (id: string) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ token, selectPortfolio }) => {
  const [portfolios, setPortfolios] = React.useState<API.PortfolioOverview[]>();
  const [error, setError] = React.useState<ErrorCode>();
  React.useEffect(() => {
    // TODO: Fetch portfolio list
    setPortfolios([API.MockOverview, API.MockOverviewTwo]);
  }, []);
  return (
    <div>
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
      {!portfolios && !error && (
        <div>
          <CircularProgress />
        </div>
      )}
      {portfolios && (
        <PortfolioOverview
          portfolios={portfolios}
          selectPortfolio={selectPortfolio}
        />
      )}
    </div>
  );
};

export default Dashboard;

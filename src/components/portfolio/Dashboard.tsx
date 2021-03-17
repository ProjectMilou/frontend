import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { MockOverview, MockOverviewTwo, PortfolioOverview } from '../../portfolio/APIClient';

export type DashboardProps = {
  token: string;

};

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [portfolios, setPortfolios] = React.useState<PortfolioOverview[]>();
  React.useEffect(() => {
    // TODO: Fetch portfolio list
    setPortfolios([MockOverview, MockOverviewTwo]);
  }, []);
  return <div>{!portfolios && <CircularProgress />}</div>;
};

export default Dashboard;

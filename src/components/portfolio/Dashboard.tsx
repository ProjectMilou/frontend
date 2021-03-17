import React from 'react';
import { CircularProgress } from '@material-ui/core';

export type DashboardProps = {
  token: string;
};

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [portfolios, setPortfolios] = React.useState();
  React.useEffect(() => {
    // TODO: Fetch portfolio list
    setPortfolios(undefined);
  }, []);
  return <div>{!portfolios && <CircularProgress />}</div>;
};

export default Dashboard;

import React from 'react';
import DashboardHeader from './DashboardHeader';
import Dashboard from './Dashboard';

const Portfolio: React.FC = () => (
  <div>
    <DashboardHeader />
    <Dashboard token="" selectPortfolio={() => {}} />
  </div>
);

export default Portfolio;

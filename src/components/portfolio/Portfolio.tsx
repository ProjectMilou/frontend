import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Dashboard from './Dashboard';

const Portfolio: React.FC<RouteComponentProps> = () => (
  <div>
    <Dashboard token="" selectPortfolio={() => {}} />
  </div>
);

export default Portfolio;

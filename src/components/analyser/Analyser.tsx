import { navigate, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import Details from './details/Details';
import Dashboard from './search/Dashboard';

const Analyser: React.FC<RouteComponentProps> = () => (
  <Router>
    <Dashboard path="/" />
    <Details back={() => navigate('/analyser')} path=":id" />
  </Router>
);
export default Analyser;

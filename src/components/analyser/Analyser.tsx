import { navigate, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import Details from './details/Details';
import Dashboard from './search/Dashboard';

const Analyser: React.FC<RouteComponentProps> = () => (
  <Router>
    <Dashboard token="" path="/" />
    <Details token="" back={() => navigate('/analyser')} path=":id" />
  </Router>
);
export default Analyser;

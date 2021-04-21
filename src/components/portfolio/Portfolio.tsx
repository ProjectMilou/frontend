import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import Details from './Details';
import Dashboard from './Dashboard';
import LoginWrapper from './LoginWrapper';

const Portfolio: React.FC<RouteComponentProps> = () => (
  // TODO: make sure that when a portfolio is loaded the scolling progress is reset
  <LoginWrapper>
    <Router>
      <Dashboard path="/" />
      <Details path=":id" />
    </Router>
  </LoginWrapper>
);

export default Portfolio;

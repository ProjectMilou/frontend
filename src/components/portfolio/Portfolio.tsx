import { navigate, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import Details from './Details';
import Dashboard from './Dashboard';

const Portfolio: React.FC<RouteComponentProps> = () =>

  // TODO: make sure that when a portfolio is loaded the scolling progress is reset
  <Router>
    <Dashboard token="" path="/" selectPortfolio={id => navigate(`/${id}`)} />
    <Details token="" back={() => navigate('/portfolio')} path=":id" />
  </Router>;

export default Portfolio;

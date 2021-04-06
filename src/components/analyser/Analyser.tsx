import { navigate, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Details from './details/Details';
import Dashboard from './search/Dashboard';

const Analyser: React.FC<RouteComponentProps> = () => 
  <Router>
    <Dashboard token="" path="/" selectStock={symbol => navigate(`/${symbol}`)} />
    <Details token="" back={() => navigate('/analyser')} path=":id" />
  </Router>;
;

export default Analyser;

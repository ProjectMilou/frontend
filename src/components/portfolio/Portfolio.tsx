import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Details from './Details';
import Dashboard from './Dashboard';

const Portfolio: React.FC<RouteComponentProps> = () => {
  const [id, setId] = React.useState<string>();

  // TODO: make sure that when a portfolio is loaded the scolling progress is reset
  return (
    <>
      {id ? (
        <Details back={() => setId(undefined)} />
      ) : (
        <Dashboard token="" selectPortfolio={setId} />
      )}
    </>
  );
};

export default Portfolio;

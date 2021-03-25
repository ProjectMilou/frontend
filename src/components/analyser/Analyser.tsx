import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Details from './Details';
import Dashboard from './Dashboard';

const Analyser: React.FC<RouteComponentProps> = () => {
    const [id, setSymbol] = React.useState<string>();

    // TODO: make sure that when a portfolio is loaded the scolling progress is reset
    return (
      <>
        {id ? (
          <Details back={() => setSymbol(undefined)} />
        ) : (
          <Dashboard token="" selectStock={setSymbol} />
        )}
      </>
    );
};

export default Analyser;

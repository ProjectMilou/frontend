import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Details from './Details';
import Dashboard from './Dashboard';

const Analyser: React.FC<RouteComponentProps> = () => {
    const [symbol, setSymbol] = React.useState<string>();

    // TODO: make sure that when a analyser page is loaded the scolling progress is reset
    return (
      <>
        {symbol ? (
          <Details symbol={symbol} back={() => setSymbol(undefined)} />
        ) : (
          <Dashboard token="" selectStock={setSymbol} />
        )}
      </>
    );
};

export default Analyser;

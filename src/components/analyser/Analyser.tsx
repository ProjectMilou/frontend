import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Details from './details/Details';
import Dashboard from './search/Dashboard';

const Analyser: React.FC<RouteComponentProps> = () => {
<<<<<<< HEAD
    const [id, setSymbol] = React.useState<string>();
=======
    const [symbol, setSymbol] = React.useState<string>();
>>>>>>> 194c5633228a7d0c39308ad63228aec746261a25

    // TODO: make sure that when a analyser page is loaded the scolling progress is reset
    return (
      <>
<<<<<<< HEAD
        {id ? (
          <Details back={() => setSymbol(undefined)} />
=======
        {symbol ? (
          <Details symbol={symbol} back={() => setSymbol(undefined)} />
>>>>>>> 194c5633228a7d0c39308ad63228aec746261a25
        ) : (
          <Dashboard token="" selectStock={setSymbol} />
        )}
      </>
    );
};

export default Analyser;

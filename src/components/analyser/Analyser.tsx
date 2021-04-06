import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Details from './details/Details';
import Dashboard from './search/Dashboard';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    background: {
      'background-color': palette.background,
    },
  })
);

const Analyser: React.FC<RouteComponentProps> = () => {
  const [symbol, setSymbol] = React.useState<string>();
  const classes = useStyles();

  // TODO: make sure that when a analyser page is loaded the scolling progress is reset
  return (
    <div className={classes.background}>
      {symbol ? (
        <Details token="" symbol={symbol} back={() => setSymbol(undefined)} />
      ) : (
        <Dashboard token="" selectStock={setSymbol} />
      )}
    </div>
  );
};

export default Analyser;

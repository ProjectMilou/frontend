// Based on Portfolio's Dashboard.tsx
import React from 'react';
import {
  LinearProgress,
  makeStyles,
  Container,
  Toolbar,
  AppBar,
  createStyles,
  Theme,
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import ErrorMessage from '../../shared/ErrorMessage';
import StockListOverview from './StockListOverview';
import DashboardHeader from '../../shared/DashboardHeader';
import Filter from './Filter';
import { isAuthenticationError } from '../../../Errors';

export interface DashboardProps extends RouteComponentProps {
  token: string;
}

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    createButton: {
      marginTop: '25px',
    },
    dashboard: {
      margin: '25px auto',
    },
    filter: {
      'background-color': palette.primary.contrastText,
      minWidth: '50%',
      maxWidth: '100%',
    },
  })
);

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const { t } = useTranslation();

  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const [error, setError] = React.useState<Error | undefined>();
  const [filters, setFilters] = React.useState<API.Filters>({
    country: [],
    industry: [],
    currency: [],
    mc: [],
  });

  const fetch = async () => {
    setError(undefined);
    try {
      const s = await API.listStocks(token, filters).then();
      setStocks(s);
    } catch (e) {
      setError(e);
    }
  };

  React.useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const classes = useStyles();

  return (
    <>
      <DashboardHeader>{t('analyser.dashboard.headerText')}</DashboardHeader>
      {!stocks && !error && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      {stocks && (
        <AppBar position="sticky" className={classes.filter}>
          <Toolbar variant="dense" disableGutters>
            <Filter stocks={stocks} filters={filters} setFilters={setFilters} />
          </Toolbar>
        </AppBar>
      )}
      <Container maxWidth="lg" className={classes.dashboard}>
        {error && (
          <ErrorMessage
            error={error}
            messageKey="analyser.dashboard.errorMessage"
            handling={
              isAuthenticationError(error)
                ? {
                    buttonText: 'error.action.login',
                    action: async () => {
                      // TODO: go back to login
                    },
                  }
                : {
                    buttonText: 'error.action.retry',
                    action: fetch,
                  }
            }
          />
        )}
        {stocks && (
          <div>
            <StockListOverview stocks={stocks} />
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;

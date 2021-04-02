import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography } from '@material-ui/core';
import * as API from '../../../analyser/APIClient';
import DashboardViewSelect, { DashboardView } from '../../shared/DashboardViewSelect';
import DashboardTable from './DashboardTable';
import DashboardCards from './DashboardCards';

export type StockListOverviewProps = {
  stocks: API.Stock[];
  selectStock: (id: string) => void;
};

const useStyles = makeStyles({
  header: { display: 'flex', marginBottom: '25px' },
  title: {
    fontSize: '48px',
    flex: '1',
    lineHeight: '72px',
    letterSpacing: '-0.015em',
  },
});

const StockListOverview: React.FC<StockListOverviewProps> = ({
  stocks,
  selectStock,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [view, setView] = React.useState<DashboardView>(DashboardView.Table);
  return (
    <>
      <div className={classes.header}>
        <div className={classes.title}>{t('analyser.dashboard.title')}</div>
        {!!stocks.length && (
          <DashboardViewSelect view={view} setView={setView} />
        )}
      </div>
      {!stocks.length && (
        <Typography>{t('analyser.dashboard.noStocks')}</Typography>
      )}
      {!!stocks.length &&
        (view === DashboardView.Table ? (
          <DashboardTable stocks={stocks} selectStock={selectStock} />
        ) : (
          <DashboardCards stocks={stocks} selectStock={selectStock} />
        ))}
    </>
  );
};

export default StockListOverview;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import * as API from '../../portfolio/APIClient';
import DashboardViewSelect, { DashboardView } from './DashboardViewSelect';
import DashboardTable from './DashboardTable';

export type PortfolioOverviewProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
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

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  portfolios,
  selectPortfolio,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [view, setView] = React.useState<DashboardView>(DashboardView.Table);
  return (
    <>
      <div className={classes.header}>
        <div className={classes.title}>{t('portfolio.dashboard.title')}</div>
        <DashboardViewSelect view={view} setView={setView} />
      </div>
      {view === DashboardView.Table ? (
        <DashboardTable
          portfolios={portfolios}
          selectPortfolio={selectPortfolio}
        />
      ) : (
        // TODO: implement card view
        <div>cards</div>
      )}
    </>
  );
};

export default PortfolioOverview;

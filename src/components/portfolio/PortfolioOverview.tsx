import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography } from '@material-ui/core';
import * as API from '../../portfolio/APIClient';
import DashboardViewSelect, {
  DashboardView,
} from '../shared/DashboardViewSelect';
import DashboardTable from './DashboardTable';
import DashboardCards from './DashboardCards';

export type PortfolioOverviewProps = {
  portfolios: API.PortfolioOverview[];
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
  createPortfolio: () => void;
};

const useStyles = makeStyles({
  header: { display: 'flex', marginBottom: '25px' },
  title: {
    fontSize: '48px',
    flex: '1',
    lineHeight: '72px',
    letterSpacing: '-0.015em',
  },
  subtext: {
    margin: '2rem 0',
  },
});

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  portfolios,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
  createPortfolio,
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
      {!portfolios.length && (
        <Typography className={classes.subtext}>
          {t('portfolio.dashboard.noPortfolios')}
        </Typography>
      )}
      {view === DashboardView.Table ? (
        <DashboardTable
          portfolios={portfolios}
          renamePortfolio={renamePortfolio}
          duplicatePortfolio={duplicatePortfolio}
          deletePortfolio={deletePortfolio}
          createPortfolio={createPortfolio}
        />
      ) : (
        <DashboardCards
          portfolios={portfolios}
          renamePortfolio={renamePortfolio}
          duplicatePortfolio={duplicatePortfolio}
          deletePortfolio={deletePortfolio}
          createPortfolio={createPortfolio}
        />
      )}
    </>
  );
};

export default PortfolioOverview;

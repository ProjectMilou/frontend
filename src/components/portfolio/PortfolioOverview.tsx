import React from 'react';
import { useTranslation } from 'react-i18next';
import * as API from '../../portfolio/APIClient';
import DashboardViewSelect, { DashboardView } from './DashboardViewSelect';
import DashboardTable from './DashboardTable';

export type PortfolioOverviewProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
};

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  portfolios,
  selectPortfolio,
}) => {
  const { t } = useTranslation();
  const [view, setView] = React.useState<DashboardView>(DashboardView.Table);
  return (
    <>
      <div>
        <div>{t('portfolio.dashboard.title')}</div>
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

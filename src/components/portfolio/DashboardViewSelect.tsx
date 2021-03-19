import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import TableIcon from '@material-ui/icons/ViewList';
import CardsIcon from '@material-ui/icons/WebAsset';

export type DashboardViewSelectProps = {
  view: DashboardView;
  setView: (view: DashboardView) => void;
};

export enum DashboardView {
  Cards,
  Table,
}

const DashboardViewSelect: React.FC<DashboardViewSelectProps> = ({
  view,
  setView,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <Tooltip title={t('portfolio.dashboard.view.table').toString()}>
        <IconButton onClick={() => setView(DashboardView.Table)}>
          <TableIcon
            htmlColor={
              view === DashboardView.Table
                ? theme.palette.primary.dark
                : undefined
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('portfolio.dashboard.view.cards').toString()}>
        <IconButton onClick={() => setView(DashboardView.Cards)}>
          <CardsIcon
            htmlColor={
              view === DashboardView.Cards
                ? theme.palette.primary.dark
                : undefined
            }
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DashboardViewSelect;

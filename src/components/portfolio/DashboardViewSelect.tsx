import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, makeStyles, Tooltip, useTheme } from '@material-ui/core';
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

const useStyles = makeStyles({
  dashboardViewSelect: {
    margin: 'auto',
  },
});

const DashboardViewSelect: React.FC<DashboardViewSelectProps> = ({
  view,
  setView,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.dashboardViewSelect}>
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
    </div>
  );
};

export default DashboardViewSelect;

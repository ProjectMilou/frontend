import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import EditIcon from '@material-ui/icons/Edit';
// TODO: possible rename of shared props types
import { DashboardTableProps, DashboardTableRowProps } from './DashboardTable';
import EuroCurrency from '../shared/EuroCurrency';
import Performance from '../shared/Performance';

const useStyles = makeStyles(() => ({
  // styles
}));

const CardComponent: React.FC<DashboardTableRowProps> = ({
  portfolio,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <></>
    </>
  );
};

const DashboardCards: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {portfolios.map((p) => (
        <CardComponent
          portfolio={p}
          key={p.id}
          selectPortfolio={selectPortfolio}
          renamePortfolio={renamePortfolio}
          duplicatePortfolio={duplicatePortfolio}
          deletePortfolio={deletePortfolio}
        />
      ))}
    </>
  );
};

export default DashboardCards;

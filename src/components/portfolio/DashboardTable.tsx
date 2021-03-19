import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';

export type DashboardTableRowProps = {
  portfolio: PortfolioOverview;
  selectPortfolio: (id: string) => void;
};

export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  portfolio,
  selectPortfolio,
}) => (
  <TableRow
    onClick={() => {
      selectPortfolio(portfolio.id);
    }}
  >
    <TableCell>{portfolio.score}</TableCell>
    <TableCell component="th" scope="row">
      {portfolio.name}
    </TableCell>
    <TableCell>{portfolio.virtual ? 'virtual' : 'real'}</TableCell>
    <TableCell>{portfolio.positionCount}</TableCell>
    <TableCell>{portfolio.value}</TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
  </TableRow>
);

export type DashboardTableProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
}) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('portfolio.score')}</TableCell>
            <TableCell>{t('portfolio.name')}</TableCell>
            <TableCell>{t('portfolio.type')}</TableCell>
            <TableCell>{t('portfolio.positionsCount')}</TableCell>
            <TableCell>{t('portfolio.value')}</TableCell>
            <TableCell>{t('portfolio.7d')}</TableCell>
            <TableCell>{t('portfolio.1y')}</TableCell>
            <TableCell>{t('portfolio.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolios.map((p) => (
            <DashboardTableRow
              portfolio={p}
              selectPortfolio={selectPortfolio}
              key={p.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;

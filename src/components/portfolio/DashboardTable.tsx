import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ButtonGroup,
  IconButton,
  Link,
  ListItemText,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import EditIcon from '@material-ui/icons/Edit';
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';

const useStyles = makeStyles({
  'table-cell': {
    align: 'center',
  },
});

export type DashboardTableRowProps = {
  portfolio: PortfolioOverview;
  selectPortfolio: (id: string) => void;
};

export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  portfolio,
  selectPortfolio,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableRow
      onClick={() => {
        selectPortfolio(portfolio.id);
      }}
    >
      <TableCell align="center">{portfolio.score}</TableCell>
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={<Link href="/">{portfolio.name}</Link>}
          secondary={portfolio.virtual ? 'virtual' : 'real'}
        />
      </TableCell>
      <TableCell align="center">
        {portfolio.virtual ? 'virtual' : 'real'}
      </TableCell>
      <TableCell align="center">{portfolio.positionCount}</TableCell>
      <TableCell align="center">{portfolio.value}</TableCell>
      <TableCell align="center" />
      <TableCell align="center" />
      <TableCell align="center">
        <ButtonGroup color="primary">
          <Tooltip title={t('portfolio.rename').toString()}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('portfolio.duplicate').toString()}>
            <IconButton>
              <DuplicateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('portfolio.delete').toString()}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export type DashboardTableProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('portfolio.score')}</TableCell>
            <TableCell align="center">{t('portfolio.name')}</TableCell>
            <TableCell align="center">{t('portfolio.type')}</TableCell>
            <TableCell align="center">
              {t('portfolio.positionsCount')}
            </TableCell>
            <TableCell align="center">{t('portfolio.value')}</TableCell>
            <TableCell align="center">{t('portfolio.7d')}</TableCell>
            <TableCell align="center">{t('portfolio.1y')}</TableCell>
            <TableCell align="center">{t('portfolio.actions')}</TableCell>
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

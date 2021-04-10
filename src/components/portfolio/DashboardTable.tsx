import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  lighten,
  ListItemText,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';
import DashboardActions from './DashboardActions';
import EuroCurrency from '../shared/EuroCurrency';
import Performance from '../shared/Performance';

const useStyles = makeStyles((theme: Theme) => ({
  action: { display: 'inline-block' },
  row: {
    cursor: 'pointer',
  },
  rowHover: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
  },
  positionCount: {
    fontSize: '24px',
  },
  disabled: {
    cursor: 'not-allowed',
  },
  createButton: {
    marginTop: '25px',
  },
}));

type DashboardTableRowProps = {
  portfolio: PortfolioOverview;
  selectPortfolio: (id: string) => void;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
};

const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  portfolio,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableRow
      onClick={() => {
        selectPortfolio(portfolio.id);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell align="center">
        {'score' in portfolio && portfolio.score}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={<Typography color="primary">{portfolio.name}</Typography>}
          secondary={
            portfolio.virtual ? t('portfolio.virtual') : t('portfolio.real')
          }
          secondaryTypographyProps={{
            color: portfolio.virtual ? 'textSecondary' : 'secondary',
          }}
        />
      </TableCell>
      <TableCell align="center" className={classes.positionCount}>
        {portfolio.positionCount}
      </TableCell>
      <TableCell align="center">
        <EuroCurrency value={portfolio.value} />
      </TableCell>
      <TableCell align="center">
        <Performance value={portfolio.perf7d} />
      </TableCell>
      <TableCell align="center">
        <Performance value={portfolio.perf1y} />
      </TableCell>
      <TableCell align="center">
        <DashboardActions
          portfolio={portfolio}
          renamePortfolio={renamePortfolio}
          duplicatePortfolio={duplicatePortfolio}
          deletePortfolio={deletePortfolio}
        />
      </TableCell>
    </TableRow>
  );
};

type Order = 'asc' | 'desc';

interface SortableHeadCell {
  id: keyof PortfolioOverview;
  label: string;
  numeric: boolean;
}

export type DashboardTableHeadProps = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PortfolioOverview
  ) => void;
  order: Order;
  orderBy: keyof PortfolioOverview;
};

export const DashboardTableHead: React.FC<DashboardTableHeadProps> = ({
  onRequestSort,
  order,
  orderBy,
}) => {
  const { t } = useTranslation();
  const headCells: SortableHeadCell[] = [
    { id: 'score', numeric: true, label: t('portfolio.score') },
    { id: 'name', numeric: false, label: t('portfolio.name') },
    {
      id: 'positionCount',
      numeric: true,
      label: t('portfolio.positionsCount'),
    },
    { id: 'value', numeric: true, label: t('portfolio.value') },
    { id: 'perf7d', numeric: true, label: t('portfolio.7d') },
    { id: 'perf1y', numeric: true, label: t('portfolio.1y') },
  ];
  const createSortHandler = (property: keyof PortfolioOverview) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            align="center"
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">{t('portfolio.actions')}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export type DashboardTableProps = {
  portfolios: API.PortfolioOverview[];
  selectPortfolio: (id: string) => void;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
  createPortfolio: () => void;
};

function comparatorTable(a: number | string, b: number | string) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function sortingTableEntry(
  portfolios: PortfolioOverview[],
  orderBy: keyof PortfolioOverview,
  order: Order
) {
  const sortingArray = portfolios;
  if (orderBy === 'name') {
    // order = true = asc | order = false = desc
    return order === 'asc'
      ? sortingArray.sort((a, b) =>
          comparatorTable(a[orderBy] as string, b[orderBy] as string)
        )
      : sortingArray.sort((a, b) =>
          comparatorTable(b[orderBy] as string, a[orderBy] as string)
        );
  }
  const sortingArrayWithoutUndefined = sortingArray.filter(
    (values) => typeof values[orderBy] !== 'undefined'
  );
  const sortedArrayWithoutUndefined =
    order === 'asc'
      ? sortingArrayWithoutUndefined.sort((a, b) =>
          comparatorTable(a[orderBy] as number, b[orderBy] as number)
        )
      : sortingArrayWithoutUndefined.sort((a, b) =>
          comparatorTable(b[orderBy] as number, a[orderBy] as number)
        );
  return sortedArrayWithoutUndefined.concat(
    portfolios.filter((values) => typeof values[orderBy] === 'undefined')
  );
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
  createPortfolio,
}) => {
  // order == true == asc | order == false == desc
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof PortfolioOverview>(
    'score'
  );
  const classes = useStyles();
  const { t } = useTranslation();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PortfolioOverview
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // TODO: Improve portfolio score visualization
  return (
    <>
      {!!portfolios.length && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <DashboardTableHead
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {sortingTableEntry(portfolios, orderBy, order).map((p) => (
                <DashboardTableRow
                  portfolio={p}
                  selectPortfolio={selectPortfolio}
                  key={p.id}
                  renamePortfolio={renamePortfolio}
                  duplicatePortfolio={duplicatePortfolio}
                  deletePortfolio={deletePortfolio}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        className={classes.createButton}
        variant="outlined"
        color="primary"
        onClick={() => createPortfolio()}
      >
        {t('portfolio.dashboard.createPortfolio')}
      </Button>
    </>
  );
};

export default DashboardTable;

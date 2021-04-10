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
import {
  NonEmptyPortfolioOverview,
  PortfolioOverview,
} from '../../portfolio/APIClient';
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
type PortfolioOverviewKeys = KeysOfUnion<PortfolioOverview>;

interface SortableHeadCell {
  id: PortfolioOverviewKeys;
  label: string;
  numeric: boolean;
}

export type DashboardTableHeadProps = {
  onRequestSort: (property: PortfolioOverviewKeys) => void;
  order: Order;
  orderBy: PortfolioOverviewKeys;
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
              onClick={() => onRequestSort(headCell.id)}
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
  portfolios: PortfolioOverview[];
  selectPortfolio: (id: string) => void;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
  createPortfolio: () => void;
};

function comparatorTable<T>(a: T, b: T) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function isDefined(obj: Record<string, unknown>, key: string) {
  return key in obj && obj[key] !== undefined;
}

function sortPortfolios(
  portfolios: PortfolioOverview[],
  orderBy: PortfolioOverviewKeys,
  order: Order
) {
  // portfolios without undefined values in the sorting column
  const nonUndefined = portfolios.filter((values) =>
    isDefined(values, orderBy)
  ) as NonEmptyPortfolioOverview[];

  const sorted =
    order === 'asc'
      ? nonUndefined.sort((a, b) => comparatorTable(a[orderBy], b[orderBy]))
      : nonUndefined.sort((a, b) => comparatorTable(b[orderBy], a[orderBy]));

  // undefined values are always at the end
  return [
    ...sorted,
    ...portfolios.filter((values) => !isDefined(values, orderBy)),
  ];
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  portfolios,
  selectPortfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
  createPortfolio,
}) => {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<PortfolioOverviewKeys>('score');
  const [sortedPortfolios, setSortedPortfolios] = React.useState(() =>
    sortPortfolios(portfolios, orderBy, order)
  );

  // only sort portfolios when needed
  React.useEffect(() => {
    setSortedPortfolios(sortPortfolios(portfolios, orderBy, order));
  }, [portfolios, orderBy, order]);

  const classes = useStyles();
  const { t } = useTranslation();

  const handleRequestSort = (property: PortfolioOverviewKeys) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // TODO: Improve portfolio score visualization
  return (
    <>
      {!!portfolios.length && (
        <TableContainer component={Paper}>
          <Table>
            <DashboardTableHead
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {sortedPortfolios.map((p) => (
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

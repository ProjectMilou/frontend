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
import StyledNumberFormat from '../shared/StyledNumberFormat';
import { portfolioDetails, importPortfolio } from '../../portfolio/Router';
import LimitedString from './LimitedString';

const useStyles = makeStyles(({ palette }: Theme) => ({
  action: { display: 'inline-block' },
  row: {
    cursor: 'pointer',
  },
  rowHover: {
    backgroundColor: lighten(palette.primary.light, 0.85),
  },
  positionCount: {
    fontSize: '24px',
  },
  disabled: {
    cursor: 'not-allowed',
  },
  buttons: {
    marginTop: '25px',
    '& > *': {
      marginLeft: '25px',
    },
    '& > *:first-child': {
      marginLeft: '0px',
    },
  },
  actionsCell: {
    minWidth: '12rem',
  },
}));

type DashboardTableRowProps = {
  portfolio: PortfolioOverview;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
};

const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  portfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableRow
      onClick={() => portfolioDetails(portfolio.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={
            <Typography color="primary">
              <LimitedString value={portfolio.name} />
            </Typography>
          }
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
        <StyledNumberFormat
          value={portfolio.value}
          suffix="€"
          size="24"
          fontWeight={400}
        />
      </TableCell>
      <TableCell align="center">
        <StyledNumberFormat
          value={portfolio.perf7d}
          suffix="%"
          size="24"
          fontWeight={400}
          paintJob
        />
      </TableCell>
      <TableCell align="center">
        <StyledNumberFormat
          value={portfolio.perf1y}
          suffix="%"
          size="24"
          fontWeight={400}
          paintJob
        />
      </TableCell>
      <TableCell align="center" className={classes.actionsCell}>
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
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => createPortfolio()}
        >
          {t('portfolio.dashboard.createPortfolio')}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => importPortfolio()}
        >
          {t('portfolio.dashboard.importPortfolio')}
        </Button>
      </div>
    </>
  );
};

export default DashboardTable;

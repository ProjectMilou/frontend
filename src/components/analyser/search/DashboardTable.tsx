// Based on Portfolio's DashboardTable.tsx Will be later either replaced by Material-UI list or refactored

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import {
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
  createStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import * as API from '../../../analyser/APIClient';
import StyledNumberFormat from '../../shared/StyledNumberFormat';
import Valuation from '../../shared/Valuation';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    action: { display: 'inline-block' },
    row: {
      cursor: 'pointer',
    },
    rowHover: {
      backgroundColor: lighten(palette.primary.light, 0.85),
    },
    defaultText: {
      fontSize: '15px',
      color: palette.primary.main,
    },
    disabled: {
      cursor: 'not-allowed',
    },
    customTableContainer: {
      overflowX: 'initial',
      height: 800,
      overflow: 'auto',
    },
    customTableHead: {
      backgroundColor: 'white',
      color: palette.primary.main,
      borderBottom: '1px solid black',
    },
  })
);

export type DashboardTableRowProps = {
  stock: API.Stock;
};

// Rounds and adds M=Million, B=Billion and K=Thousand --> American System!!!
export function moneyFormat(val: number): string {
  let round = '';
  if (Math.abs(val) >= 1.0e9) {
    round = `€${Math.round(Math.abs(val) / 1.0e9)}B`;
  } else if (Math.abs(val) >= 1.0e6) {
    round = `€${Math.round(Math.abs(val) / 1.0e6)}M`;
  } else if (Math.abs(val) >= 1.0e3) {
    round = `€${Math.round(Math.abs(val) / 1.0e3)}K`;
  } else {
    round = `€${Math.abs(val)}`;
  }
  return round;
}

// Numbers are output in different colors need clear approach!
export const DashboardTableRow: React.FC<DashboardTableRowProps> = ({
  stock,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableRow
      onClick={() => navigate(`analyser/${stock.symbol}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell align="center" component="th" scope="row">
        <ListItemText
          primary={
            <Typography className={classes.defaultText} color="primary">
              {stock.symbol}
            </Typography>
          }
          secondary={stock.name}
          secondaryTypographyProps={{
            color: 'textSecondary',
          }}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat value={parseInt(stock.price, 10)} suffix="€" />
      </TableCell>
      <TableCell align="center">
        <StyledNumberFormat
          value={parseFloat(stock.per7d)}
          suffix="%"
          paintJob
        />
      </TableCell>
      <TableCell align="center">
        <StyledNumberFormat
          value={parseFloat(stock.per365d)}
          suffix="%"
          paintJob
        />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.defaultText}>
          {moneyFormat(stock.marketCapitalization)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <StyledNumberFormat value={stock.analystTargetPrice} suffix="€" />
      </TableCell>
      <TableCell align="center">
        <Valuation value={stock.valuation} />
      </TableCell>
      <TableCell align="center">
        <StyledNumberFormat value={stock.div} suffix="%" paintJob />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.defaultText}>
          {t(`${stock.industry}`)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function sortStocks(
  items: API.Stock[],
  order: Order,
  orderBy: keyof API.Stock
) {
  return order === 'desc'
    ? items.sort((a, b) => descendingComparator(a, b, orderBy))
    : items.sort((a, b) => -descendingComparator(a, b, orderBy));
}

interface HeadCell {
  id: keyof API.Stock;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

export type DashboardTableHeaderProps = {
  onRequestSort: (property: keyof API.Stock) => void;
  order: Order;
  orderByKey: keyof API.Stock;
};

const DashboardTableHeader: React.FC<DashboardTableHeaderProps> = ({
  onRequestSort,
  order,
  orderByKey,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const headCells: HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: t('stock.name'),
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: t('stock.lastPrice'),
    },
    { id: 'per7d', numeric: true, disablePadding: false, label: t('stock.7d') },
    {
      id: 'per365d',
      numeric: true,
      disablePadding: false,
      label: t('stock.365d'),
    },
    {
      id: 'marketCapitalization',
      numeric: true,
      disablePadding: false,
      label: t('stock.marketCap'),
    },
    {
      id: 'analystTargetPrice',
      numeric: true,
      disablePadding: false,
      label: t('stock.analystsTarget'),
    },
    {
      id: 'valuation',
      numeric: true,
      disablePadding: false,
      label: t('stock.valuation'),
    },
    { id: 'div', numeric: true, disablePadding: false, label: t('stock.div') },
    {
      id: 'industry',
      numeric: true,
      disablePadding: false,
      label: t('stock.industry'),
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((hc) => (
          <TableCell
            key={hc.id}
            align="center"
            classes={{ root: classes.customTableHead }}
            sortDirection={orderByKey === hc.id ? order : false}
          >
            <TableSortLabel
              active={orderByKey === hc.id}
              direction={orderByKey === hc.id ? order : 'asc'}
              onClick={() => onRequestSort(hc.id)}
            >
              {hc.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export type DashboardTableProps = {
  stocks: API.Stock[];
};

const DashboardTable: React.FC<DashboardTableProps> = ({ stocks }) => {
  const classes = useStyles();

  const [items, setItems] = React.useState<API.Stock[]>(stocks.slice(0, 10));
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderByKey, setOrderByKey] = React.useState<keyof API.Stock>('name');
  const [sortedStocks, setSortedStocks] = React.useState(() =>
    sortStocks(items, order, orderByKey)
  );
  React.useEffect(() => {
    setSortedStocks(sortStocks(items, order, orderByKey));
  }, [items, order, orderByKey]);
  const handleRequestSort = (property: keyof API.Stock) => {
    const isAsc = orderByKey === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderByKey(property);
  };

  React.useEffect(() => {
    setItems(stocks.slice(0, 10));
    setHasMore(true);
  }, [stocks]);

  const fetchMoreData = () => {
    if (items.length >= stocks.length) {
      setHasMore(false);
      return;
    }
    setHasMore(true);
    // a fake async api call like which sends
    // 5 more stocks in 1.5 secs
    // TODO replace with async API call
    setTimeout(() => {
      const newItems = items.concat(
        stocks.slice(items.length, items.length + 5)
      );
      setItems(newItems);
    }, 1500);
  };
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<></>}
      scrollableTarget="scrollableTable"
      endMessage={<></>}
    >
      <Paper>
        <TableContainer
          id="scrollableTable"
          classes={{ root: classes.customTableContainer }}
        >
          <Table stickyHeader aria-label="simple table">
            <DashboardTableHeader
              onRequestSort={handleRequestSort}
              order={order}
              orderByKey={orderByKey}
            />
            <TableBody>
              {sortedStocks.map((s) => (
                <DashboardTableRow stock={s} key={s.symbol} />
              ))}
              {hasMore && <h4>Loading More Stocks...</h4>}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </InfiniteScroll>
  );
};

export default DashboardTable;

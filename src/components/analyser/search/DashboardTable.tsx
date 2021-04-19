// Based on Portfolio's DashboardTable.tsx Will be later either replaced by Material-UI list or refactored

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import {
  lighten,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
  Typography,
  createStyles,
  useTheme,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import * as API from '../../../analyser/APIClient';
import StyledNumberFormat from '../../shared/StyledNumberFormat';
import Valuation from '../../shared/Valuation';
import DashboardTableHeader from './DashboardTableHeader';
import TextOverText from '../../shared/TextOverText';

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
      fontSize: '1.3rem',
      fontWeight: 600,
    },
    highlightText: {
      fontSize: '1rem',
      fontWeight: 600,
      color: palette.lightBlue.main,
    },
    loading: {
      margin: '15px',
    },
    disabled: {
      cursor: 'not-allowed',
    },
    customTableContainer: {
      overflowX: 'initial',
      height: 800,
      overflow: 'auto',
      borderRadius: 5,
    },
  })
);

export type DashboardTableRowProps = {
  stock: API.Stock;
};

type Order = 'asc' | 'desc';

export type DashboardTableProps = {
  stocks: API.Stock[];
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
  const theme = useTheme();

  return (
    <TableRow
      onClick={() => navigate(`analyser/${stock.symbol}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames(classes.row, hover && classes.rowHover)}
    >
      <TableCell component="th" scope="row">
        <TextOverText
          top={`${stock.symbol}`}
          bottom={`${stock.name}`}
          colorTop={theme.palette.grey[700]}
          colorBottom={theme.palette.lightBlue.main}
          sizeBottom="1rem"
          alignment="left"
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat
          value={parseInt(stock.price, 10)}
          suffix="€"
          paintJob={theme.palette.primary.main}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat
          value={parseFloat(stock.per7d)}
          suffix="%"
          paintJob
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
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
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat
          value={parseFloat(stock.analystTargetPrice)}
          suffix="€"
          paintJob={theme.palette.primary.main}
        />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <Valuation value={stock.valuation} size="1.3rem" />
      </TableCell>
      <TableCell align="center" className={classes.defaultText}>
        <StyledNumberFormat value={parseFloat(stock.div)} suffix="%" paintJob />
      </TableCell>
      <TableCell align="center">
        <Typography color="primary" className={classes.highlightText}>
          {t(`${stock.industry}`)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

// desc sort comparator
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
// function: take asc or desc order and the property to sort the stocks
function sortStocks(
  items: API.Stock[],
  order: Order,
  orderBy: keyof API.Stock
) {
  return order === 'desc'
    ? items.sort((a, b) => descendingComparator(a, b, orderBy))
    : items.sort((a, b) => -descendingComparator(a, b, orderBy));
}

const DashboardTable: React.FC<DashboardTableProps> = ({ stocks }) => {
  const classes = useStyles();

  const [items, setItems] = React.useState<API.Stock[]>(stocks.slice(0, 10));
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  // default order: ascending
  const [order, setOrder] = React.useState<Order>('asc');
  // default order key: stock's name
  const [orderByKey, setOrderByKey] = React.useState<keyof API.Stock>('name');
  // sorted stocks
  const [sortedStocks, setSortedStocks] = React.useState(() =>
    sortStocks(items, order, orderByKey)
  );
  React.useEffect(() => {
    setSortedStocks(sortStocks(items, order, orderByKey));
  }, [items, order, orderByKey]);
  // function to handle a sort reqeust, order wil betoggled every time.
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
            {/* Table body take already sorted stocks */}
            <TableBody>
              {sortedStocks.map((s) => (
                <DashboardTableRow stock={s} key={s.symbol} />
              ))}
              {hasMore && (
                <Typography className={classes.loading}>
                  <CircularProgress color="primary" />
                </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </InfiniteScroll>
  );
};

export default DashboardTable;

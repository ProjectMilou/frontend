// Initally based on Portfolio's DashboardTable.tsx

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
  createStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as API from '../../../analyser/APIClient';
import DashboardTableHeader from './DashboardTableHeader';
import DashboardTableRow from './DasboardTableRow';

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      tableLayout: 'fixed',
    },
    loading: {
      margin: '15px',
    },
    customTableContainer: {
      overflowX: 'initial',
      height: 800,
      overflow: 'auto',
      borderRadius: 5,
    },
  })
);

type Order = 'asc' | 'desc';

export type DashboardTableProps = {
  stocks: API.Stock[];
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

  // currently dispayled stocks in lazy loading
  const [items, setItems] = React.useState<API.Stock[]>(stocks.slice(0, 10));
  // boolean if more stocks are available for loading
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  // default order: ascending
  const [order, setOrder] = React.useState<Order>('asc');
  // default order key: stock's name
  const [orderByKey, setOrderByKey] = React.useState<keyof API.Stock>('symbol');
  // sorted stocks
  const [sortedStocks, setSortedStocks] = React.useState<API.Stock[]>(
    sortStocks(stocks, order, orderByKey)
  );

  // fetch more data (currently mocked)
  const fetchMoreData = () => {
    if (items.length >= sortedStocks.length) {
      setHasMore(false);
      return;
    }
    setHasMore(true);
    // a fake async api call like which sends
    // 5 more stocks in 1.5 secs
    // TODO replace with async API call
    setTimeout(() => {
      const newItems = items.concat(
        sortedStocks.slice(items.length, items.length + 5)
      );
      setItems(newItems);
    }, 1500);
  };

  // function to handle a sort request, order will be toggled every time.
  const handleRequestSort = (property: keyof API.Stock) => {
    const isAsc = orderByKey === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderByKey(property);
  };

  // update sorted stocks if new sotck, new items, new order or new orderByKey
  React.useEffect(() => {
    setSortedStocks(sortStocks(stocks, order, orderByKey));
    setItems(sortedStocks.slice(0, 10));

    if (items.length >= sortedStocks.length) {
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks, order, orderByKey]);

  React.useEffect(() => {
    setItems(sortedStocks.slice(0, 10));
    setHasMore(true);
  }, [sortedStocks]);

  // component
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
          <Table
            stickyHeader
            aria-label="simple table"
            className={classes.table}
          >
            <DashboardTableHeader
              onRequestSort={handleRequestSort}
              order={order}
              orderByKey={orderByKey}
            />
            <TableBody>
              {items.map((s) => (
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

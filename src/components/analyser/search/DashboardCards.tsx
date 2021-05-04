import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, makeStyles, GridList } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as API from '../../../analyser/APIClient';
import { DashboardCardsRow } from './DashboardCardRow';

const useStyles = makeStyles(() => ({
  grid: {
    overflow: 'hidden' /* Hide scrollbars */,
  },
  loading: {
    margin: '15px',
  },
}));

export type DashboardCardsProps = {
  stocks: API.Stock[];
};

/**
 * used to display a grid of cards to select stocks from
 *
 * @param stocks list of stocks to get stock overview from
 *
 */
const DashboardCards: React.FC<DashboardCardsProps> = ({ stocks }) => {
  const classes = useStyles();

  const [items, setItems] = React.useState<API.Stock[]>(stocks.slice(0, 10));
  const [hasMore, setHasMore] = React.useState<boolean>(true);

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
    // TODO replace with async API call if more stocks are provided
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
      <Grid className={classes.grid}>
        <GridList>
          {items.map((s) => (
            <DashboardCardsRow stock={s} key={s.symbol} />
          ))}
          {hasMore && (
            <div className={classes.loading}>
              <CircularProgress color="primary" />
            </div>
          )}
        </GridList>
      </Grid>
    </InfiniteScroll>
  );
};

export default DashboardCards;

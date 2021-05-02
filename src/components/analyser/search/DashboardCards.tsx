import React from 'react';
import { navigate } from '@reach/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  makeStyles,
  GridList,
  ButtonBase,
  useTheme,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import TextOverText from '../../shared/TextOverText';
import CompanyLogo from '../CompanyLogo';
import { convertPercentToColor } from '../../../analyser/Helper';

const useStyles = makeStyles(() => ({
  card: {
    width: 289,
    margin: 10,
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  media: {
    height: 200,
    width: 289,
    placeItems: 'center',
    alignItems: 'center',
    objectFit: 'scale-down',
    padding: 20,
  },
  content: {
    margin: 10,
  },
  divider: {
    margin: `${30}px 0`,
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  rightBound: {
    float: 'right',
  },
  leftBound: {
    float: 'left',
  },
  paddingBottom: {
    paddingBottom: 40,
  },
  grid: {
    overflow: 'hidden' /* Hide scrollbars */,
  },
  loading: {
    margin: '15px',
  },
}));

export type DashboardCardsRowProps = {
  stock: API.Stock;
};

export const DashboardCardsRow: React.FC<DashboardCardsRowProps> = ({
  stock,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.cardAction}
        onClick={() => navigate(`analyser/${stock.symbol}`)}
      >
        <CardMedia>
          <CompanyLogo stockOverview={stock} style={classes.media} />
        </CardMedia>
        <CardContent className={classes.content}>
          <TextOverText
            top={`${stock.symbol}`}
            bottom={`${stock.name}`}
            colorTop={theme.palette.grey[700]}
            sizeBottom="1.3rem"
            alignment="left"
          />
          <Divider className={classes.divider} light />
          <div className={classes.paddingBottom}>
            <div className={classes.leftBound}>
              <TextOverText
                top={t('analyser.dashboard.view.cards.lastPrice')}
                colorTop={theme.palette.grey[700]}
                bottom={`${stock.price}`}
                currency={`${stock.currency}`}
                sizeBottom="1.3rem"
              />
            </div>
            <div className={classes.rightBound}>
              <TextOverText
                top={t('stock.30d')}
                bottom={`${stock.per30d.toFixed(2)}%`}
                colorTop={theme.palette.grey[700]}
                colorBottom={convertPercentToColor(stock.per30d)}
                sizeBottom="1.3rem"
              />
            </div>
          </div>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export type DashboardCardsProps = {
  stocks: API.Stock[];
};

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

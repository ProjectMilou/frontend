import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  makeStyles,
  GridList,
  ButtonBase,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import TextOverText from '../TextOverText';

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
}));

export type DashboardCardsRowProps = {
  stock: API.Stock;
  selectStock: (id: string) => void;
};

function convertPercentToColor(val: number): string {
  return val < 0 ? '#D64745' : '#50E2A8';
}

export const DashboardCardsRow: React.FC<DashboardCardsRowProps> = ({
  stock,
  selectStock,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.cardAction}
        onClick={() => {
          selectStock(stock.symbol);
        }}
      >
        <CardMedia
          className={classes.media}
          component="img"
          image={stock.picture.toString()}
        />
        <CardContent className={classes.content}>
          <TextOverText
            top={`${stock.symbol}`}
            bottom={`${stock.name}`}
            colorTop="#68696b"
            colorBottom="#122654"
            sizeBottom="1.3rem"
            alignment="left"
          />
          <Divider className={classes.divider} light />
          <div className={classes.paddingBottom}>
            <div className={classes.leftBound}>
              <TextOverText
                top="Last Price"
                colorTop="#68696b"
                bottom={`${stock.price}`}
                euro
              />
            </div>
            <div className={classes.rightBound}>
              <TextOverText
                top={t('stock.30d')}
                bottom={`${stock['30d']}%`}
                colorTop="#68696b"
                colorBottom={convertPercentToColor(stock['30d'])}
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
  selectStock: (symbol: string) => void;
};

const DashboardCards: React.FC<DashboardCardsProps> = ({
  stocks,
  selectStock,
}) => (
  <Grid>
    <GridList>
      {stocks.map((s) => (
        <DashboardCardsRow stock={s} selectStock={selectStock} key={s.symbol} />
      ))}
    </GridList>
  </Grid>
);

export default DashboardCards;

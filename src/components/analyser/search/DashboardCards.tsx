import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  lighten,
  makeStyles,
  Theme,
  Typography,
  GridList,
  ButtonBase,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import ValueOverName from '../ValueOverName';


const useStyles = makeStyles((theme: Theme) => ({
  action: { display: 'inline-block' },
  row: {
    cursor: 'pointer',
  },
  rowHover: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
  },
  defaultText: {
    fontSize: '24px',
  },
  disabled: {
    cursor: 'not-allowed',
  },
  card: {
    width: 280,
    margin: 10,
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  media: {
    height: 200,
    width: 260,
    placeItems: 'center',
    alignItems: 'center',
    objectFit: 'scale-down',
    margin: 10,
  },
  content: {
    textAlign: 'left',
    padding: 30,
  },
  divider: {
    margin: `${30}px 0`,
  },
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    lineHeight: 1.8,
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  rightBound:{
    float: 'right',
  }
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
          <Typography
            className="MuiTypography--heading"
            variant="h6"
            gutterBottom
          >
            {stock.symbol}
            <div className={classes.rightBound}>
            <ValueOverName
              value={`${stock['30d']}%`}
              name={t('stock.30d')}
              valueColor={convertPercentToColor(stock['30d'])}
              textColor="#primary"
            />
            </div>
          </Typography>
          <Divider className={classes.divider} light />
          <Typography className="MuiTypography-body1" variant="caption">
            {stock.name}
          </Typography>
          <Divider className={classes.divider} light />
          <Typography className="MuiTypography-body1" variant="caption">
            {stock.price}
          </Typography>
          
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

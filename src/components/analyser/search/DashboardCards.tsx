import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Divider,
  lighten,
  makeStyles,
  Theme,
  Typography,
  GridList,
} from '@material-ui/core';
import classNames from 'classnames';
import * as API from '../../../analyser/APIClient';

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
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: 30
  },
  divider: {
    margin: `${30}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
}));

export type DashboardCardsRowProps = {
  stock: API.Stock;
  selectStock: (id: string) => void;
};

export const DashboardCardsRow: React.FC<DashboardCardsRowProps> = ({
  stock,
  selectStock,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);
  const classes = useStyles();

  return (
    <Card className={classes.card} style={{width: 300, height: 450}}>
        <CardMedia
          style={{height: 200, width: 280, placeItems: "center", alignItems: "center", objectFit: "scale-down", margin: 10}}
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
          </Typography>
          <Typography
            className="MuiTypography--subheading"
            variant="caption"
          >
            {stock.name}
          </Typography>
          <Divider className={classes.divider} light />
          <Button size="small" color="primary"
            onClick={() => {
              selectStock(stock.symbol);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={classNames(classes.row, hover && classes.rowHover)}
          >
            Go to details
          </Button>
        </CardContent>
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
          <DashboardCardsRow
            stock={s}
            selectStock={selectStock}
            key={s.symbol}
          />
        ))}
      </GridList>
    </Grid>
    )
  

export default DashboardCards;

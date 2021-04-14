import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HotelIcon from '@material-ui/icons/Hotel';
import Grid from '@material-ui/core/Grid';
import VolatilityLineEntry from './VolatilityLineEntry';
import { Position } from '../../portfolio/APIClient';
import VolatilityGraphMarketAvg from './VolatilityGraphMarketAvg';
import VolatilityGraphPersonalPortfolio from './VolatilityGraphPersonalPortfolio';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    icons: {
      color: palette.primary.contrastText,
    },
    line: {
      width: '90%',
      height: '3px',
      margin: 'auto',
      'background-color': palette.primary.contrastText,
      position: 'relative',
      display: 'flex',
    },
    wrapper: {
      height: '250px',
    },
  })
);

type DetailsVolatilityGraphProps = {
  positions: Position[];
  portfolioVolatility: number;
};

const DetailsVolatilityGraph: React.FC<DetailsVolatilityGraphProps> = ({
  positions,
  portfolioVolatility,
}) => {
  type VolatilityLineData = {
    [symbol: string]: number;
  };

  const theme = useTheme();
  const classes = useStyles();

  const sortedStocks: VolatilityLineData = {};

  if (positions) {
    Object.values(positions)
      .sort((a, b) => (a.qty * a.stock.price > b.qty * b.stock.price ? -1 : 1))
      .slice(0, 3)
      .map((p) => p.stock)
      .forEach((s) => {
        sortedStocks[s.symbol] = s.volatility;
      });
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.wrapper}
      >
        <HotelIcon className={classes.icons} />

        <div className={classes.line}>
          <VolatilityGraphMarketAvg />
          <VolatilityGraphPersonalPortfolio
            portfolioVolatility={portfolioVolatility}
          />
          {Object.entries(sortedStocks).map(([symbol, volatility]) => (
            <VolatilityLineEntry
              volatilityValue={volatility}
              tooltipText={symbol}
              color={
                volatility > 1
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
            />
          ))}
        </div>
        <FlashOnIcon className={classes.icons} />
      </Grid>
    </>
  );
};

export default DetailsVolatilityGraph;

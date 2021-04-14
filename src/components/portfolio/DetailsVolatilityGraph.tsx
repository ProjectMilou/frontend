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

type DetailsVolatilityGraphProps = {
  positions: Position[];
};

const DetailsVolatilityGraph: React.FC<DetailsVolatilityGraphProps> = ({
  positions,
}) => {
  const useStyles = makeStyles(({ palette }: Theme) =>
    createStyles({
      text: {
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
      lineMiddle: {
        height: '3rem',
        width: '0.25rem',
        'background-color': palette.primary.contrastText,
        margin: 'auto',
      },
      marketAvg: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        display: 'flex',
        flexDirection: 'column',
      },
      lineMiddleText: {
        color: palette.primary.contrastText,
        marginBottom: '0.5rem',
      },
      wrapper: {
        height: '250px',
      },
    })
  );

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
        <HotelIcon style={{ color: theme.palette.primary.contrastText }} />

        <div className={classes.line}>
          <div className={classes.marketAvg}>
            <div className={classes.lineMiddleText}>Market Average</div>
            <div className={classes.lineMiddle} />
          </div>

          {Object.entries(sortedStocks).map(([symbol, volatility]) => (
            <VolatilityLineEntry
              volatilityValue={volatility}
              tooltipText={symbol}
              color={
                volatility > 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
            />
          ))}
        </div>
        <FlashOnIcon style={{ color: theme.palette.primary.contrastText }} />
      </Grid>
    </>
  );
};

export default DetailsVolatilityGraph;

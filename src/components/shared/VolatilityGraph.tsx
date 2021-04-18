import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HotelIcon from '@material-ui/icons/Hotel';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

type ColorProps = {
  color: string;
};

const useStyles = makeStyles<Theme, ColorProps>(() =>
  createStyles({
    icons: {
      color: (props) => props.color,
    },
    horizontalLine: {
      width: '90%',
      height: '3px',
      margin: 'auto',
      'background-color': (props) => props.color,
      position: 'relative',
      display: 'flex',
    },
    wrapper: {
      height: '250px',
    },
    lineMiddle: {
      height: '3rem',
      width: '0.25rem',
      'background-color': (props) => props.color,
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
      color: (props) => props.color,
      marginBottom: '0.5rem',
    },
  })
);

type DetailsVolatilityGraphProps = {
  color: string;
};

const DetailsVolatilityGraph: React.FC<DetailsVolatilityGraphProps> = ({
  color,
  children,
}) => {
  const classes = useStyles({ color });
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.wrapper}
    >
      <HotelIcon className={classes.icons} />
      <div className={classes.horizontalLine}>
        {/* the line with the market average */}
        <div className={classes.marketAvg}>
          <div className={classes.lineMiddleText}>
            {t('portfolio.details.analytics.volatility.marketAvg')}
          </div>
          <div className={classes.lineMiddle} />
        </div>
        {/* children in form of VilatilityLineEntry */}
        {children}
      </div>
      <FlashOnIcon className={classes.icons} />
    </Grid>
  );
};

export default DetailsVolatilityGraph;

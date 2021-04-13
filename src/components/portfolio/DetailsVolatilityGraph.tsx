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
import { useTranslation } from 'react-i18next';
import VolatilityLineEntry from './VolatilityLineEntry';

const portfolioVolatility = 0.5208850412096532;

const DetailsVolatilityGraph: React.FC = () => {
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
        height: '20px',
        width: '3px',
        'background-color': 'black',
        margin: 'auto',
      },
      marketAvg: {
        position: 'absolute',
        top: '450%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
      },
      lineMiddleText: {
        color: palette.primary.contrastText,
      },
      lineMiddleDynamic: {
        position: 'absolute',
        height: '20px',
        width: '3px',
        'background-color': palette.primary.contrastText,
      },
    })
  );

  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

  const volatility = {
    Apple: 1.0304461557501514,
    Google: 0.5496680733681532,
    Amazon: 0.5993856976545141,
    IBM: 0.5765889119578946,
    'Alibaba group': 0.7140162113218156,
    'JPMorgan Chase & Co.': 0.6486754881067324,
  };

  return (
    <>
      <h1 className={classes.text}>{t('portfolio.details.volatility')}</h1>
      <h3 className={classes.text}>
        {Math.round(portfolioVolatility * 1000) / 1000}
      </h3>
      <h2 className={classes.text}>
        {t('portfolio.details.volatilityMarket')}
      </h2>

      <Grid container direction="row" justify="center" alignItems="center">
        <HotelIcon style={{ color: theme.palette.primary.contrastText }} />
        <div className={classes.line}>
          <div className={classes.marketAvg}>
            <div className={classes.lineMiddle} />
            <div className={classes.lineMiddleText}>Market Average</div>
          </div>

          <VolatilityLineEntry
            volatilityValue={1.0304461557501514}
            tooltipText="Apple"
          />
          <VolatilityLineEntry
            volatilityValue={0.5496680733681532}
            tooltipText="Google"
          />
          <VolatilityLineEntry
            volatilityValue={0.5993856976545141}
            tooltipText="Amazon"
          />
          <VolatilityLineEntry
            volatilityValue={0.5765889119578946}
            tooltipText="IBM"
          />
          <VolatilityLineEntry
            volatilityValue={0.7140162113218156}
            tooltipText="Alibaba group"
          />
          <VolatilityLineEntry
            volatilityValue={0.6486754881067324}
            tooltipText="JPMorgan Chase & Co."
          />
        </div>
        <FlashOnIcon style={{ color: theme.palette.primary.contrastText }} />
      </Grid>
    </>
  );
};

export default DetailsVolatilityGraph;

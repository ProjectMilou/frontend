import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
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
  })
);

const VolatilityGraphMarketAvg: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.marketAvg}>
        <div className={classes.lineMiddleText}>
          {t('portfolio.details.analytics.volatility.marketAvg')}
        </div>
        <div className={classes.lineMiddle} />
      </div>
    </>
  );
};

export default VolatilityGraphMarketAvg;

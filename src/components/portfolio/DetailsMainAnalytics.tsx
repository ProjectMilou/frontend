import React from 'react';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import DetailsAnalyticsHeatmap from './DetailsMainAnalyticsHeatmap';
import DetailsAnalyticsDebtEquityBar from './DetailsAnalyticsDebtEquityBar';
import VolatilityGraph from '../shared/VolatilityGraph';
import LargeVolatilityLineEntry from '../shared/LargeVolatilityLineEntry';
import VolatilityLineEntry from './VolatilityLineEntry';
import InfoButton from '../shared/InfoButton';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    titleWrapper: {
      color: palette.primary.contrastText,
      marginBottom: '2em',
      marginTop: '2em',
      fontSize: '1.5em',
      display: 'flex',
    },
    value: {
      marginLeft: '1em',
    },
  })
);

type DetailsMainAnalyticsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

type VolatilityLineData = {
  [symbol: string]: number;
};

const DetailsMainAnalytics: React.FC<DetailsMainAnalyticsProps> = ({
  portfolio,
}) => {
  const { palette } = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const sortedStocks: VolatilityLineData = {};

  if (portfolio.positions) {
    Object.values(portfolio.positions)
      // sort by total value (largest to smallest)
      .sort((a, b) => b.qty * b.stock.price - a.qty * a.stock.price)
      // take the top 5
      .slice(0, 4)
      .map((p) => p.stock)
      .forEach((s) => {
        sortedStocks[s.symbol] = s.volatility;
      });
  }

  return (
    <>
      <div className={classes.titleWrapper}>
        <span>{t('portfolio.details.analytics.standardDeviation')}</span>
        <span className={classes.value}>
          <StyledNumberFormat
            value={portfolio.analytics.standardDeviation * 100}
            suffix="%"
          />
        </span>
        <InfoButton
          infotext={t(
            'portfolio.details.analytics.standardDeviation.infoButton'
          )}
        />
      </div>
      <div className={classes.titleWrapper}>
        <span>{t('portfolio.details.analytics.correlation')}</span>
        <InfoButton
          infotext={t('portfolio.details.analytics.correlations.info')}
        />
      </div>
      <DetailsAnalyticsHeatmap portfolio={portfolio} height={350} />
      <div className={classes.titleWrapper}>
        <span>{t('portfolio.details.analytics.debtEquity.total')}</span>
        <span className={classes.value}>
          <StyledNumberFormat
            value={portfolio.analytics.debtEquity * 100}
            suffix="%"
          />
        </span>
        <InfoButton
          infotext={t('portfolio.details.analytics.debtEquity.infoButton')}
        />
      </div>
      <DetailsAnalyticsDebtEquityBar portfolio={portfolio} height={350} />
      <div className={classes.titleWrapper}>
        {t('portfolio.details.analytics.volatility.total')}
        <span className={classes.value}>
          {Math.round(portfolio.analytics.volatility * 1000) / 1000}
        </span>
        <InfoButton
          infotext={t('analyser.details.Volatility.BetaFactor.infoButton')}
        />
      </div>
      <div className={classes.titleWrapper}>
        {t('portfolio.details.analytics.volatility.vsMarket')}
      </div>
      <VolatilityGraph color={palette.primary.contrastText}>
        <LargeVolatilityLineEntry
          volatilityValue={portfolio.analytics.volatility}
          name={t(
            'portfolio.details.analytics.volatility.myPortfolio'
          ).toString()}
          textColor={palette.primary.contrastText}
        />
        {Object.entries(sortedStocks).map(([symbol, volatility]) => (
          <VolatilityLineEntry
            key={symbol}
            volatilityValue={volatility}
            tooltipText={symbol}
            color={volatility > 1 ? palette.error.main : palette.success.main}
          />
        ))}
      </VolatilityGraph>
    </>
  );
};
export default DetailsMainAnalytics;

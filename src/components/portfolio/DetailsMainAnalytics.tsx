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
import { collectStocks, CollectedStocks } from '../../portfolio/Helper';
import NoInfoAvailable from './NoInfoAvailable';

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

/**
 * Component containing all the information about the portfolios analytics section
 * It includes among others {@link DetailsAnalyticsHeatmap}, {@link DetailsAnalyticsDebtEquityBar} and {@link VolatilityGraph}
 *
 * @param portfolio - The filtered portfolio (stocks with the missing info flag are NOT included in the positions)
 */
const DetailsMainAnalytics: React.FC<DetailsMainAnalyticsProps> = ({
  portfolio,
}) => {
  const { palette } = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const sortedStocks: CollectedStocks = collectStocks(
    portfolio.positions,
    true
  );

  /*
   * the portfolio passed as props holds only those positions with no data missing
   * if there are no positions with valid data it makes no sense to display this section
   * once there is at least one stock with valid data is makes sense again to display the section
   * the correlation heatmap has a check of its own to only display as soon as two stocks are available
   */
  if (portfolio.positions.length === 0) return <NoInfoAvailable />;

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
          infotext={`${t(
            `portfolio.details.analytics.standardDeviation.infoButton`
          )}\n\n${t('source.investopedia')}`}
        />
      </div>
      <div className={classes.titleWrapper}>
        <span>{t('portfolio.details.analytics.correlation')}</span>
        <InfoButton
          infotext={`${t(
            'portfolio.details.analytics.correlations.info'
          )}\n\n${t('source.investopedia')}`}
        />
      </div>
      <DetailsAnalyticsHeatmap portfolio={portfolio} height={350} />
      <div className={classes.titleWrapper}>
        <span>{t('portfolio.details.analytics.debtEquity.total')}</span>
        <span className={classes.value}>
          <StyledNumberFormat value={portfolio.analytics.debtEquity} />
        </span>
        <InfoButton
          infotext={`${t(
            'portfolio.details.analytics.debtEquity.infoButton'
          )}\n\n${t('source.investopedia')}`}
        />
      </div>
      <DetailsAnalyticsDebtEquityBar portfolio={portfolio} height={350} />
      <div className={classes.titleWrapper}>
        {t('portfolio.details.analytics.volatility.total')}
        <span className={classes.value}>
          <StyledNumberFormat value={portfolio.analytics.volatility} />
        </span>
        <InfoButton
          infotext={`${t(
            'analyser.details.Volatility.BetaFactor.infoButton'
          )}\n\n${t('source.investopedia')}`}
        />
      </div>
      <div className={classes.titleWrapper}>
        {t('portfolio.details.analytics.volatility.vsMarket')}
      </div>
      <VolatilityGraph color={palette.primary.contrastText}>
        <LargeVolatilityLineEntry
          volatilityValue={portfolio.analytics.volatility}
          marketValue={1}
          name={t(
            'portfolio.details.analytics.volatility.myPortfolio'
          ).toString()}
          textColor={palette.primary.contrastText}
        />
        {Object.entries(sortedStocks).map(([volatility, symbol]) => (
          <VolatilityLineEntry
            key={symbol}
            volatilityValue={parseFloat(volatility)}
            tooltipText={symbol}
            color={
              parseFloat(volatility) > 1
                ? palette.error.main
                : palette.success.main
            }
          />
        ))}
      </VolatilityGraph>
    </>
  );
};
export default DetailsMainAnalytics;

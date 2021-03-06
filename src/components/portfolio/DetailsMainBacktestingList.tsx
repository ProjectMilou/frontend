import React from 'react';
import List from '@material-ui/core/List';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import WarningIcon from '@material-ui/icons/Warning';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SpeedIcon from '@material-ui/icons/Speed';
import HeightIcon from '@material-ui/icons/Height';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import DetailsMainBacktestingListItem from './DetailsMainBacktestingListItem';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    flexBasis: '50%',
  },
  trendUp: {
    color: theme.palette.success.light,
  },
  trendDown: {
    color: theme.palette.error.light,
  },
  mdd: {
    color: theme.palette.primary.contrastText,
  },
  beta: {
    color: theme.palette.orange.main,
  },
  sharpe: {
    color: theme.palette.darkOrange.main,
  },
  cagr: {
    color: theme.palette.lightBlue.main,
  },
}));

type DetailsMainBacktestingListProps = {
  changeBest: number;
  changeWorst: number;
  mddMaxToMin: number;
  standardDeviation: number;
  sharpeRatio: number;
  cagr: number;
};

/**
 * This component renders all relevant KPIs with a fitting icon and the value
 * It holds the {@link DetailsMainBacktestingListItem} component which resembles one of the KPI fields.
 *
 * @param changeBest - The best change in monetary value that the portfolio had during the period
 * @param changeWorst - The worst change in monetary value that the portfolio had during the period
 * @param mddMaxToMin - The maximum draw down of the portfolio during the period
 * @param standardDeviation - The standard deviation of the portfolio during the period
 * @param sharpeRatio - The sharpe ratio of the portfolio during the period
 * @param cagr - The compound annual growth rate of the portfolio for that period
 */
const DetailsMainBacktestingList: React.FC<DetailsMainBacktestingListProps> = ({
  changeBest,
  changeWorst,
  mddMaxToMin,
  standardDeviation,
  sharpeRatio,
  cagr,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <List className={classes.list}>
      <DetailsMainBacktestingListItem
        icon={<TrendingUpIcon className={classes.trendUp} />}
        title={t('portfolio.details.backtesting.bestChange')}
        value={<StyledNumberFormat value={changeBest} suffix="€" doLimit />}
        infoText={t('portfolio.details.backtesting.bestChangeInfo')}
      />
      <DetailsMainBacktestingListItem
        icon={<TrendingDownIcon className={classes.trendDown} />}
        title={t('portfolio.details.backtesting.worstChange')}
        value={<StyledNumberFormat value={changeWorst} suffix="€" doLimit />}
        infoText={t('portfolio.details.backtesting.worstChangeInfo')}
      />
      <DetailsMainBacktestingListItem
        icon={<HeightIcon className={classes.mdd} />}
        title={t('portfolio.details.backtesting.mddMinMax')}
        value={<StyledNumberFormat value={mddMaxToMin * 100} suffix="%" />}
        infoText={`${t('portfolio.details.backtesting.mddInfo')}\n\n${t(
          'source.investopedia'
        )}`}
      />
      <DetailsMainBacktestingListItem
        icon={<WarningIcon className={classes.beta} />}
        title={t('portfolio.details.backtesting.standardDeviation')}
        value={
          <StyledNumberFormat value={standardDeviation * 100} suffix="%" />
        }
        infoText={`${t(
          'portfolio.details.analytics.standardDeviation.infoButton'
        )}\n\n${t('source.investopedia')}`}
      />
      <DetailsMainBacktestingListItem
        icon={<NewReleasesIcon className={classes.sharpe} />}
        title={t('portfolio.details.backtesting.sharpeRatio')}
        value={<StyledNumberFormat value={sharpeRatio} />}
        infoText={`${t(
          'analyser.details.Volatility.SharpeRatio.infoButton'
        )}\n\n${t('source.investopedia')}`}
      />
      <DetailsMainBacktestingListItem
        icon={<SpeedIcon className={classes.cagr} />}
        title={t('portfolio.details.backtesting.cagr')}
        value={<StyledNumberFormat value={cagr * 100} suffix="%" />}
        infoText={`${t('portfolio.details.backtesting.cagrInfo')}\n\n${t(
          'source.investopedia'
        )}`}
      />
    </List>
  );
};

export default DetailsMainBacktestingList;

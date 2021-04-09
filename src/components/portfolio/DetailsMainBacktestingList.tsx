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
  // TODO replace hard coded
  beta: {
    color: '#ffff00',
  },
  sharpe: {
    color: '#ffa500',
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
        value={<StyledNumberFormat value={changeBest} suffix="&nbsp;€" />}
        descriptionText={t(
          'portfolio.details.backtesting.bestChangeDescription'
        )}
      />
      <DetailsMainBacktestingListItem
        icon={<TrendingDownIcon className={classes.trendDown} />}
        title={t('portfolio.details.backtesting.worstChange')}
        value={<StyledNumberFormat value={changeWorst} suffix="&nbsp;€" />}
        descriptionText={t(
          'portfolio.details.backtesting.worstChangeDescription'
        )}
      />
      <DetailsMainBacktestingListItem
        icon={<HeightIcon className={classes.mdd} />}
        title={t('portfolio.details.backtesting.mddMinMax')}
        value={<StyledNumberFormat value={mddMaxToMin} suffix="&nbsp;%" />}
        descriptionText={t('portfolio.details.backtesting.mddDescription')}
      />
      <DetailsMainBacktestingListItem
        icon={<WarningIcon className={classes.beta} />}
        title={t('portfolio.details.backtesting.standardDeviation')}
        value={
          <StyledNumberFormat value={standardDeviation} suffix="&nbsp;%" />
        }
        descriptionText={t(
          'portfolio.details.backtesting.standardDeviationDescription'
        )}
      />
      <DetailsMainBacktestingListItem
        icon={<NewReleasesIcon className={classes.sharpe} />}
        title={t('portfolio.details.backtesting.sharpeRatio')}
        value={sharpeRatio}
        descriptionText={t(
          'portfolio.details.backtesting.sharpeRatioDescription'
        )}
      />
      <DetailsMainBacktestingListItem
        icon={<SpeedIcon className={classes.cagr} />}
        title={t('portfolio.details.backtesting.cagr')}
        value={<StyledNumberFormat value={cagr} suffix="&nbsp;%" />}
        descriptionText={t('portfolio.details.backtesting.cagrDescription')}
      />
    </List>
  );
};

export default DetailsMainBacktestingList;

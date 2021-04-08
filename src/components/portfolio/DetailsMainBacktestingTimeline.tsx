import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Timeline from '@material-ui/lab/Timeline';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import TodayIcon from '@material-ui/icons/Today';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EuroCurrency from '../shared/EuroCurrency';
import DetailsMainBacktestingTimelineItem from './DetailsMainBacktestingTimelineItem';

const useStyles = makeStyles((theme) => ({
  timeline: {
    flexGrow: 0,
    flexBasis: '50%',
  },
  minValue: {
    color: theme.palette.success.light,
  },
  startAndEnd: {
    fontSize: '2.5em',
  },
  euroMin: {
    fontSize: '2.5em',
    color: theme.palette.error.light,
  },
  euroMax: {
    fontSize: '2.5em',
    color: theme.palette.success.light,
  },
}));

type DetailsMainBacktestingTimelineProps = {
  startDate: Date;
  startValue: number;
  minDate: Date;
  minVale: number;
  maxDate: Date;
  maxValue: number;
  endDate: Date;
  endValue: number;
};

const DetailsMainBacktestingTimeline: React.FC<DetailsMainBacktestingTimelineProps> = ({
  startDate,
  startValue,
  minDate,
  minVale,
  maxDate,
  maxValue,
  endDate,
  endValue,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Timeline align="left" className={classes.timeline}>
      <DetailsMainBacktestingTimelineItem
        date={startDate}
        icon={<TodayIcon className={classes.startAndEnd} />}
        title={t('portfolio.details.backtesting.start')}
        value={<EuroCurrency value={startValue} size="1em" />}
      />
      <DetailsMainBacktestingTimelineItem
        date={minDate}
        icon={<EuroSymbolIcon className={classes.euroMin} />}
        title={t('portfolio.details.backtesting.min')}
        value={<EuroCurrency value={minVale} size="1em" />}
      />
      <DetailsMainBacktestingTimelineItem
        date={maxDate}
        icon={<EuroSymbolIcon className={classes.euroMax} />}
        title={t('portfolio.details.backtesting.max')}
        value={<EuroCurrency value={maxValue} size="1em" />}
      />
      <DetailsMainBacktestingTimelineItem
        date={endDate}
        icon={<EventAvailableIcon className={classes.startAndEnd} />}
        title={t('portfolio.details.backtesting.end')}
        value={<EuroCurrency value={endValue} size="1em" />}
        lastItem
      />
    </Timeline>
  );
};

export default DetailsMainBacktestingTimeline;

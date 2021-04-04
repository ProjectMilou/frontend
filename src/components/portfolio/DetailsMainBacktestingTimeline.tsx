import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import TodayIcon from '@material-ui/icons/Today';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EuroCurrency from '../shared/EuroCurrency';

const useStyles = makeStyles((theme) => ({
  timeline: {
    flexGrow: 0,
    flexBasis: '50%',
  },
  paper: {
    padding: '6px 16px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  timelineItem: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  oppositeContent: {
    color: theme.palette.primary.contrastText,
    flexGrow: 0,
    margin: 0,
    flexBasis: '30%',
    whiteSpace: 'nowrap',
  },
  timelineContent: {
    flexGrow: 0,
    flexBasis: '30%',
    whiteSpace: 'nowrap',
  },
  timelineConnector: {
    position: 'absolute',
    height: '2.5rem',
    top: '80%',
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
      <TimelineItem className={classes.timelineItem}>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography>{startDate.toLocaleDateString()}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <TodayIcon className={classes.startAndEnd} />
          </TimelineDot>
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContent}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {t('portfolio.details.backtesting.start')}
            </Typography>
            <Typography>
              <EuroCurrency value={startValue} size="1em" />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineItem}>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography>{minDate.toLocaleDateString()}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <EuroSymbolIcon className={classes.euroMin} />
          </TimelineDot>
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContent}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {t('portfolio.details.backtesting.min')}
            </Typography>
            <Typography>
              <EuroCurrency value={minVale} size="1em" />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineItem}>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography>{maxDate.toLocaleDateString()}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <EuroSymbolIcon className={classes.euroMax} />
          </TimelineDot>
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContent}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {t('portfolio.details.backtesting.max')}
            </Typography>
            <Typography>
              <EuroCurrency value={maxValue} size="1em" />{' '}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineItem}>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography>{endDate.toLocaleDateString()}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <EventAvailableIcon className={classes.startAndEnd} />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContent}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {t('portfolio.details.backtesting.end')}
            </Typography>
            <Typography>
              <EuroCurrency value={endValue} size="1em" />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default DetailsMainBacktestingTimeline;

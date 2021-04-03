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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EuroCurrency from '../shared/EuroCurrency';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    backgroundColor: theme.palette.primary.light,
  },
  textDate: {
    color: theme.palette.primary.contrastText,
  },
  minValue: {
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
    <Timeline align="left">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography className={classes.textDate}>
            {startDate.toLocaleDateString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
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
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography className={classes.textDate}>
            {minDate.toLocaleDateString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <ThumbDownIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
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
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography className={classes.textDate}>
            {maxDate.toLocaleDateString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <ThumbUpIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
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
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography className={classes.textDate}>
            {endDate.toLocaleDateString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
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

import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import TimelineItem from '@material-ui/lab/TimelineItem';

const useStyles = makeStyles((theme) => ({
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
  paper: {
    padding: '6px 16px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

type DetailsMainBacktestingTimelineItemProps = {
  date: Date;
  icon: ReactNode;
  title: string;
  value: ReactNode;
  lastItem?: boolean;
};

/**
 * This component represents one value inside the backtesting timeline with icon and date
 *
 * @param date - Date that is being displayed on the left
 * @param icon - Icon that is being displayed in the middle to aid visual representation
 * @param title - Label inside the paper on the right that describes the event (e.g. best value)
 * @param value - Value of the event
 * @param lastItem - Marks the last item of the timeline. No further connector line is drawn
 */
const DetailsMainBacktestingTimelineItem: React.FC<DetailsMainBacktestingTimelineItemProps> = ({
  date,
  icon,
  title,
  value,
  lastItem,
}) => {
  const classes = useStyles();

  return (
    <TimelineItem className={classes.timelineItem}>
      <TimelineOppositeContent className={classes.oppositeContent}>
        <Typography>{date.toISOString().split('T')[0]}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary">{icon}</TimelineDot>
        {lastItem ? undefined : (
          <TimelineConnector className={classes.timelineConnector} />
        )}
      </TimelineSeparator>
      <TimelineContent className={classes.timelineContent}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
          <Typography>{value}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default DetailsMainBacktestingTimelineItem;

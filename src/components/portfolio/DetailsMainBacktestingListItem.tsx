import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Paper } from '@material-ui/core';
import InfoButton from '../shared/InfoButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    display: 'flex',
    padding: '0.8em',
    fontSize: '1em',
  },
  valueText: {
    textAlign: 'right',
  },
  listIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAndInfoButton: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type DetailsMainBacktestingListItemProps = {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  infoText: string;
};

/**
 * This component represents one KPI with fitting icon and value
 *
 * @param icon - Visual representation of the KPI
 * @param title - Name of the KPI
 * @param value - Value of the KPI
 * @param infoText - Explanation for the KPI that is being displayed as a tooltip in {@link InfoButton}
 */
const DetailsMainBacktestingListItem: React.FC<DetailsMainBacktestingListItemProps> = ({
  icon,
  title,
  value,
  infoText,
}) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Paper className={classes.paper}>
        <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
        <div className={classes.textAndInfoButton}>
          <ListItemText>{title}</ListItemText>
          <InfoButton infotext={infoText} />
        </div>
        <ListItemText className={classes.valueText}>{value}</ListItemText>
      </Paper>
    </ListItem>
  );
};

export default DetailsMainBacktestingListItem;

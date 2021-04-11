import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
  },
  expandButton: {
    color: theme.palette.primary.contrastText,
  },
  labelText: {
    color: theme.palette.primary.contrastText,
    fontSize: '1em',
  },
  valueText: {
    color: theme.palette.primary.contrastText,
    fontSize: '1em',
    textAlign: 'right',
  },
  listIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type DetailsMainBacktestingListItemProps = {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  descriptionText: string;
};

const DetailsMainBacktestingListItem: React.FC<DetailsMainBacktestingListItemProps> = ({
  icon,
  title,
  value,
  descriptionText,
}) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
          <ListItemText className={classes.labelText}>{title}</ListItemText>
          <ListItemText className={classes.valueText}>{value}</ListItemText>
        </AccordionSummary>
        <AccordionDetails className={classes.labelText}>
          {descriptionText}
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};

export default DetailsMainBacktestingListItem;

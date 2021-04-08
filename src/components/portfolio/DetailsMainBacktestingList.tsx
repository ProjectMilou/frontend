import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import WarningIcon from '@material-ui/icons/Warning';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SpeedIcon from '@material-ui/icons/Speed';
import HeightIcon from '@material-ui/icons/Height';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import EuroCurrency from '../shared/EuroCurrency';
import Performance from '../shared/Performance';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    flexBasis: '50%',
  },
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

  // TODO replace description placeholder with actual description
  return (
    <List className={classes.list}>
      <ListItem>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon className={classes.listIcon}>
              <TrendingUpIcon className={classes.trendUp} />
            </ListItemIcon>{' '}
            <ListItemText className={classes.labelText}>
              {t('portfolio.details.backtesting.bestChange')}
            </ListItemText>
            <ListItemText className={classes.valueText}>
              <EuroCurrency value={changeBest} size="1em" />
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails className={classes.labelText}>
            {t('portfolio.details.backtesting.bestChangeDescription')}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon className={classes.listIcon}>
              <TrendingDownIcon className={classes.trendDown} />
            </ListItemIcon>
            <ListItemText className={classes.labelText}>
              {t('portfolio.details.backtesting.worstChange')}
            </ListItemText>
            <ListItemText className={classes.valueText}>
              <EuroCurrency value={changeWorst} size="1em" />
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails className={classes.labelText}>
            {t('portfolio.details.backtesting.worstChangeDescription')}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon className={classes.listIcon}>
              <HeightIcon className={classes.mdd} />
            </ListItemIcon>
            <ListItemText className={classes.labelText}>
              {t('portfolio.details.backtesting.mddMinMax')}
            </ListItemText>
            <ListItemText className={classes.valueText}>
              <Performance value={mddMaxToMin} size="1em" noPaint />
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails className={classes.labelText}>
            {t('portfolio.details.backtesting.mddDescription')}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon className={classes.listIcon}>
              <WarningIcon className={classes.beta} />
            </ListItemIcon>
            <ListItemText className={classes.labelText}>
              {t('portfolio.details.backtesting.standardDeviation')}
            </ListItemText>
            <ListItemText className={classes.valueText}>
              <Performance value={standardDeviation} size="1em" noPaint />
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails className={classes.labelText}>
            {t('portfolio.details.backtesting.standardDeviationDescription')}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon className={classes.listIcon}>
              <NewReleasesIcon className={classes.sharpe} />
            </ListItemIcon>
            <ListItemText className={classes.labelText}>
              {t('portfolio.details.backtesting.sharpeRatio')}
            </ListItemText>
            <ListItemText className={classes.valueText}>
              {sharpeRatio}
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails className={classes.labelText}>
            {t('portfolio.details.backtesting.sharpeRatioDescription')}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandButton} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemIcon className={classes.listIcon}>
              <SpeedIcon className={classes.cagr} />
            </ListItemIcon>
            <ListItemText className={classes.labelText}>
              {t('portfolio.details.backtesting.cagr')}
            </ListItemText>
            <ListItemText className={classes.valueText}>
              <Performance value={cagr} size="1em" noPaint />
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails className={classes.labelText}>
            {t('portfolio.details.backtesting.cagrDescription')}
          </AccordionDetails>
        </Accordion>
      </ListItem>
    </List>
  );
};

export default DetailsMainBacktestingList;

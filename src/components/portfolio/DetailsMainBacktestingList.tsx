import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
  valueText: {
    color: theme.palette.primary.contrastText,
    fontSize: '1em',
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
    <div>
      <List>
        <ListItem>
          <ListItemText className={classes.valueText}>
            {t('portfolio.details.backtesting.bestChange')}
          </ListItemText>
          <ListItemIcon>
            <TrendingUpIcon className={classes.trendUp} />
          </ListItemIcon>
          <ListItemText className={classes.valueText}>
            <EuroCurrency value={changeBest} size="1em" />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText className={classes.valueText}>
            {t('portfolio.details.backtesting.worstChange')}
          </ListItemText>
          <ListItemIcon className={classes.trendDown}>
            <TrendingDownIcon />
          </ListItemIcon>
          <ListItemText className={classes.valueText}>
            <EuroCurrency value={changeWorst} size="1em" />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText className={classes.valueText}>
            {t('portfolio.details.backtesting.mddMinMax')}
          </ListItemText>
          <ListItemIcon className={classes.mdd}>
            <HeightIcon />
          </ListItemIcon>
          <ListItemText className={classes.valueText}>
            <Performance value={mddMaxToMin} size="1em" noPaint />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText className={classes.valueText}>
            {t('portfolio.details.backtesting.standardDeviation')}
          </ListItemText>
          <ListItemIcon className={classes.beta}>
            <WarningIcon />
          </ListItemIcon>
          <ListItemText className={classes.valueText}>
            <Performance value={standardDeviation} size="1em" noPaint />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText className={classes.valueText}>
            {t('portfolio.details.backtesting.sharpeRatio')}
          </ListItemText>
          <ListItemIcon className={classes.sharpe}>
            <NewReleasesIcon />
          </ListItemIcon>
          <ListItemText className={classes.valueText} primary={sharpeRatio} />
        </ListItem>
      </List>
      <ListItem>
        <ListItemText className={classes.valueText}>
          {t('portfolio.details.backtesting.cagr')}
        </ListItemText>
        <ListItemIcon className={classes.cagr}>
          <SpeedIcon />
        </ListItemIcon>
        <ListItemText className={classes.valueText}>
          <Performance value={cagr} size="1em" noPaint />
        </ListItemText>
      </ListItem>
    </div>
  );
};

export default DetailsMainBacktestingList;

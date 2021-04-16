import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import {StockDetails } from '../../../analyser/APIClient';
import * as DashboardTable from '../search/DashboardTable';

type DetailsOverviewCompanyProos = {
  stockDetails: StockDetails;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.light,
      fontSize: 35,
    },
    header: {
      ...theme.typography.h6,
      display: 'inline',
      color: theme.palette.primary.light,
    },
    intro: {
      ...theme.typography.body1,
      color: theme.palette.primary.light,
    },
    url: {
      textDecoration: 'none',
      color: theme.palette.lightBlue.main,
    },
  })
);

const DetailsOverviewCompany: React.FC<DetailsOverviewCompanyProos> = ({
  stockDetails,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <LanguageIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.header}>
            {t('company.website')}:{' '}
            <a className={classes.url} href={stockDetails.website}>
              {stockDetails.website}
            </a>
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ChildFriendlyIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.header}>
            {t('stock.founded')}: {stockDetails.founded}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccountBalanceWalletIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.header}>
            {t('company.mc')}:{' '}
            {DashboardTable.moneyFormat(
              parseInt(stockDetails.marketCapitalization, 10)
            )}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <GroupIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.header}>
            {t('stock.fullTimeEmployees')}: {stockDetails.employees}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <HomeIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.header}>
            {t('stock.address')}: {stockDetails.address}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccountBalanceIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.header}>
            {t('company.exchange')}: {stockDetails.exchange}
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default DetailsOverviewCompany;

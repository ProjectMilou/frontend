import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Paper,
  ListItem,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BusinessIcon from '@material-ui/icons/Business';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import SectionDivider from './SectionDivider';
import DetailsOverviewInfoBox from './DetailsOverviewInfoBox';

import * as DashboardTable from '../search/DashboardTable';

// stylesheet for the Summary section
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageWrapper: {
      width: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '100%',
    },
    card: {
      width: '100%',
    },
    icon: {
      color: theme.palette.lightBlue.main,
      fontSize: 35,
    },
    header: {
      ...theme.typography.h6,
      display: 'inline',
    },
    intro: theme.typography.body1,
  })
);

// type declarations
type DetailsOverviewProps = {
  // overview of stock
  stockOverview: Stock;
  // details of stock
  stockDetails: StockDetails;
};

const DetailsOverview: React.FC<DetailsOverviewProps> = ({
  stockOverview,
  stockDetails,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <SectionDivider section={t('analyser.details.summaryHeader')} />
      <Grid container spacing={1}>
        <DetailsOverviewInfoBox
          stockOverview={stockOverview}
          stockDetails={stockDetails}
        />
        <Grid
          container
          alignItems="flex-start"
          justify="space-evenly"
          direction="row"
          spacing={5}
        >
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <img
                className={classes.imageWrapper}
                alt="Company Pictrue"
                src={stockOverview.picture.toString()}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <List>
              <ListItem>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <ListItemIcon>
                      <BusinessIcon className={classes.icon} />{' '}
                    </ListItemIcon>
                    <Typography className={classes.header}>
                      {stockOverview.name}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography className={classes.intro}>
                      {stockDetails.intro}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
              <ListItem>
                <Paper className={classes.card}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LanguageIcon className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography className={classes.header}>
                          {t('company.website')}:{' '}
                          <a href={stockDetails.website}>
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
                          {t('stock.fullTimeEmployees')}:{' '}
                          {stockDetails.employees}
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
                </Paper>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsOverview;

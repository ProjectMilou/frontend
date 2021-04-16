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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import SectionDivider from './SectionDivider';
import DetailsOverviewInfoBox from './DetailsOverviewInfoBox';

import * as DashboardTable from '../search/DashboardTable';
import DetailsOverviewCompany from './DetailsOverviewCompany';

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
        
        <Grid
          container
          alignItems="flex-start"
          justify="space-evenly"
          direction="row"
          spacing={5}
        >
          {/* picture and ccompany overview */}
          <Grid item xs={3}>
            <Paper className={classes.paper} variant="outlined">
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
                <Accordion className={classes.card} variant="outlined">
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
                <Accordion className={classes.card} variant="outlined">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <ListItemIcon>
                      <MenuBookIcon className={classes.icon} />{' '}
                    </ListItemIcon>
                    <Typography className={classes.header}>
                      Company Details
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <DetailsOverviewCompany stockDetails={stockDetails} />
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsOverview;

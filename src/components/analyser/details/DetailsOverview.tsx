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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BusinessIcon from '@material-ui/icons/Business';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import SectionDivider from '../../shared/SectionDivider';
import DetailsOverviewCompany from './DetailsOverviewCompany';
import CompanyLogo from '../CompanyLogo';

// stylesheet for the Summary section
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      maxWidth: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      width: '100%',
      height: theme.spacing(17),
    },
    card: {
      width: '100%',
      height: '100%',
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
          <Grid item sm={3} justify="center">
            <Paper className={classes.paper} variant="outlined">
              <CompanyLogo stockOverview={stockOverview} />
            </Paper>
          </Grid>

          <Grid item sm={9}>
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

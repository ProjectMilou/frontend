import React from 'react';
import {
  useTheme,
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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import SectionDivider from './SectionDivider';
import DetailsOverviewInfoBox from './DetailsOverviewInfoBox';

// stylesheet for the Summary section
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageWrapper: {
      width: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
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
  const theme = useTheme();
  const { t } = useTranslation();

  console.log(stockDetails)
  return (
    <>
      <SectionDivider section={t('analyser.details.summaryHeader')} />
      <Grid container spacing={1}>
        <DetailsOverviewInfoBox
          stockOverview={stockOverview}
          stockDetails={stockDetails}
        />
        <p>huhu</p>
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
                    <Typography className={classes.intro}>
                      {t('stock.intro')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>{stockDetails.employees} Test2</AccordionDetails>
                </Accordion>
              </ListItem>
              <ListItem>
                <Typography className={classes.intro}>
                  {t('stock.founded')}: {stockDetails.founded}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className={classes.intro}>
                  {t('stock.fullTimeEmployees')}:{' '}
                  {stockDetails.employees}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className={classes.intro}>
                  {t('stock.address')}: {stockDetails.address}
                </Typography>
              </ListItem>
            </List>
            <Typography className={classes.intro}>
                  {t('stock.address')}: {stockDetails.address}
                </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsOverview;

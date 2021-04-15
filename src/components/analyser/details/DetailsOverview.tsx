// Based on Portfolio DetailsOverview

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
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import TextOverText from '../TextOverText';
import SectionDivider from './SectionDivider';

// stylesheet for the Summary section
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: theme.palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      // TODO: use theme color
      borderColor: 'grey',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
    infoBox: {
      outlineStyle: 'solid',
      outlineColor: 'ba',
      outlineWidth: '0.15rem',
      margin: '1rem 0',
    },
    infoValueContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    infoValueWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
    },
    vl: {
      margin: '0.5rem 1rem',
      height: '4rem',
      alignSelf: 'center',
      // TODO: use theme color
      borderColor: 'grey',
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    imageWrapper: {
      width: "100%"
    },

    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    // TODO center image vertically
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      maxWidth: '90%',
      maxHeight: '90%',
    },
    lineChartWrapper: {
      MaxWidth: '10rem',
      MaxHeight: '0rem',
      flexBasis: '60%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // border: '2px dashed #f69c55',
    },
    intro: {
      textAlign: 'left',
      fontSize: '24px',
      marginTop: '10px',
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

// returns the details page header
const DetailsOverview: React.FC<DetailsOverviewProps> = ({
  stockOverview,
  stockDetails,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  // TODO: no hard coded colors
  // TODO: update range to fit data from analytics
  // convert a score to a color
  function convertPerformanceToColor(num: number): string {
    return num <= 0 ? '#D64745' : '#50E2A8';
  }
  function convertToPercent(num: number): string {
    return `${(Math.round(num * 1000) / 10).toString()}%`;
  }

  return (
    <>
      <SectionDivider section= {t('analyser.details.summaryHeader')}/>
      <Grid container spacing={1} >
      <Grid container xs={12} justify="space-around" direction="row" className={classes.infoBox}>
        
          <Grid item>
            {/* country */}
            <TextOverText
              top={`${stockOverview.country}`}
              bottom={t('stock.country')}
              colorTop={theme.palette.primary.dark}
              colorBottom={theme.palette.primary.dark}
            />
          </Grid>

          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <Grid item>
            {/* currency */}
            <TextOverText
              top={`${stockOverview.currency}`}
              bottom={t('stock.currency')}
              colorTop={theme.palette.primary.light}
              colorBottom={theme.palette.primary.dark}
            />
          </Grid>

          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <Grid item>
            {/* industry */}
            <TextOverText
              top={`${stockOverview.industry}`}
              bottom={t('stock.industry')}
              colorTop={theme.palette.primary.light}
              colorBottom={theme.palette.primary.dark}
            />
          </Grid>

          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <Grid item>
            {/* dividend */}
            <TextOverText
              top={convertToPercent(stockOverview.div)}
              bottom={t('stock.div')}
              colorTop={convertPerformanceToColor(stockOverview.div)}
              colorBottom={theme.palette.primary.dark}
            />
          </Grid>
      </Grid>
    
      {/* Picture and description of company */}
      
      <Grid container alignItems="flex-start" justify="space-evenly" direction="row" spacing={5}>
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
          <Typography className={classes.intro}>
            {stockDetails.intro}
          </Typography>
          </Accordion>
          </ListItem>
          <ListItem>
          <Typography className={classes.intro}>
            {t('stock.founded')}: {stockDetails.founded}
          </Typography>
          </ListItem>
          <ListItem>
          <Typography className={classes.intro}>
            {t('stock.fullTimeEmployees')}: {stockDetails.employees}
          </Typography>
          </ListItem>
          <ListItem>
          <Typography className={classes.intro}>
            {t('stock.address')}: {stockDetails.address}
          </Typography>
          </ListItem>
          </List>
        </Grid>
      </Grid>
      
      </Grid>

    </>
  );
};

export default DetailsOverview;

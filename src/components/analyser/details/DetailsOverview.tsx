import React from 'react';
import { useTheme, makeStyles, createStyles, Theme, Card, CardMedia, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ValueOverName from './ValueOverName';
import DetailsLineChart from './DetailsLineChart';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import StockListOverview from '../search/StockListOverview';

// stylesheet for the Summary section
const useStyles = makeStyles(({ palette }: Theme) =>
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
      color: palette.primary.main,
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
      outlineColor: 'grey',
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
    pieChartWrapper: {
      display: 'flex',
      width: '20rem',
      height: '20rem',
      flexBasis: '35%',
    },
    // TODO center image vertically
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      maxWidth: '90%',
      maxHeight: '90%'
    },
    imageCard: {
      height: "20rem",
      width: "20rem",
    
    },
    lineChartWrapper: {
      width: '40rem',
      height: '20rem',
      flexBasis: '60%',
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

  const score = stockOverview.valuation
  // TODO: no hard coded colors
  // takes a percent value and converts it to a color
  function convertPercentToColor(val: number): string {
    return val < 0 ? '#D64745' : '#50E2A8';
  }

  // TODO: no hard coded colors
  // TODO: update range to fit data from analytics
  // convert a score to a color
  function convertScoreToColor(val: number): string {
    return val < 0.5 ? '#D64745' : '#50E2A8';
  }

  // these are for the DetailsDonut Chart for the company portions
  const portions = [2,4];
  const companyNames = ["APPL", "MSFT"];
  // Mock Portfolio values
  const portfolioValue = [
    10,
    41,
    35,
    51,
    49,
    62,
    69,
    91,
    148,
    200,
    123,
    5,
    234,
  ];
  // const portfolioValue = positions.reduce((sumOfPortfolio, p) => (p.qty * p.stock.price) + sumOfPortfolio, 0);

  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>
            {t('analyser.details.summaryHeader')}
          </h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      <div className={classes.infoBox}>
        <div className={classes.infoValueContainer}>
          {/* box section 1 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '10%' }}
          >
            {/* total score of the portfolio */}
            <ValueOverName
              value={score.toString()}
              name={t('stock.symbol')}
              valueColor={convertScoreToColor(score)}
              textColor='#000'
            />
          </div>
          {/* devider 1 */}
          <hr className={classes.vl} />
          {/* box section 2 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '35%' }}
          >
            {/* last price */}
            <ValueOverName
              value={`${stockOverview['1d']}%`}
              name={t('stock.lastPrice')}
              valueColor={convertPercentToColor(stockOverview['1d'])}
              textColor='#000'
            />
            {/* 7 day moving average */}
            <ValueOverName
              value={`${stockOverview['7d']}%`}
              name={t('stock.7d')}
              valueColor={convertPercentToColor(stockOverview['7d'])}
              textColor='#000'
            />
            {/* 30d year moving average */}
            <ValueOverName
              value={`${stockOverview['30d']}%`}
              name={t('stock.30d')}
              valueColor={convertPercentToColor(stockOverview['30d'])}
              textColor='#000'
            />
            {/* total markte cap */}
            <ValueOverName
              // TODO: change to euro sign
              value={`$${stockOverview.marketCapitalization}`}
              name={t('stock.marketCap')}
              valueColor={theme.palette.primary.contrastText}
              textColor='#000'
            />
          </div>
          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* analyst target */}
            <ValueOverName
              value={`${stockOverview.analystTargetPrice}`}
              name={t('stock.analystsTarget')}
              valueColor={theme.palette.primary.contrastText}
              textColor='#000'
            />
            {/* valuation */}
            <ValueOverName
              value={`${stockOverview.valuation}`}
              name={t('stock.valuation')}
              valueColor={theme.palette.primary.contrastText}
              textColor='#000'
            />
            {/* growth */}
            <ValueOverName
              value={`${stockOverview.growth}`}
              name={t('stock.growth')}
              valueColor={theme.palette.primary.contrastText}
              textColor='#000'
            />
            {/* dividend */}
            <ValueOverName
              value={`${stockOverview.div}`}
              name={t('stock.div')}
              valueColor={theme.palette.primary.contrastText}
              textColor='#000'
            />
            {/* industry */}
            <ValueOverName
              value={`${stockOverview.industry}`}
              name={t('stock.industry')}
              valueColor={theme.palette.primary.contrastText}
              textColor='#000'
            />
          </div>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <div className={classes.pieChartWrapper}>
          <Card className={classes.imageCard}>
              <CardMedia
                className={classes.imageContainer}
                component="img"
                image= {stockOverview.picture.toString()}
              />
          </Card>
        </div>
        <div className={classes.lineChartWrapper}>
          <Typography>{stockDetails.intro}</Typography>
        </div>
      </div>
    </div>
  );
};


export default DetailsOverview;
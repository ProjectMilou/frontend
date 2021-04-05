// Based on Portfolio DetailsOverview

import React from 'react';
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ValueOverName from '../../shared/ValueOverName';
import { Stock, StockDetails } from '../../../analyser/APIClient';

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
    imageWrapper: {
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
      maxHeight: '90%',
    },
    lineChartWrapper: {
      width: '40rem',
      height: '20rem',
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
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* country */}
            <ValueOverName
              value={`${stockOverview.country}`}
              name={t('stock.country')}
              valueColor={theme.palette.primary.dark}
              nameColor={theme.palette.primary.dark}
            />
          </div>

          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* currency */}
            <ValueOverName
              value={`${stockOverview.currency}`}
              name={t('stock.currency')}
              valueColor={theme.palette.primary.light}
              nameColor={theme.palette.primary.dark}
            />
          </div>

          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* industry */}
            <ValueOverName
              value={`${stockOverview.industry}`}
              name={t('stock.industry')}
              valueColor={theme.palette.primary.light}
              nameColor={theme.palette.primary.dark}
            />
          </div>

          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* dividend */}
            <ValueOverName
              value={convertToPercent(stockOverview.div)}
              name={t('stock.div')}
              valueColor={convertPerformanceToColor(stockOverview.div)}
              nameColor={theme.palette.primary.dark}
            />
          </div>
        </div>
      </div>
      {/* Picture and description of company */}
      <div className={classes.chartContainer}>
        <div className={classes.imageWrapper}>
          <img
            className={classes.imageContainer}
            alt="Company Pictrue"
            src={stockOverview.picture.toString()}
          />
        </div>
        <div className={classes.lineChartWrapper}>
          {/* Nier format */}
          <Typography className={classes.intro}>
            {stockDetails.intro}
          </Typography>
          <Typography className={classes.intro}>
            {t('stock.founded')}: {stockDetails.founded}
          </Typography>
          <Typography className={classes.intro}>
            {t('stock.fullTimeEmployees')}: {stockDetails.fullTimeEmployees}
          </Typography>
          <Typography className={classes.intro}>
            {t('stock.address')}: {stockDetails.address}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DetailsOverview;

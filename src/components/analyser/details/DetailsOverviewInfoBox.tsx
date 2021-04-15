// Based on Portfolio DetailsOverview

import React from 'react';
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme,
  Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Stock, StockDetails } from '../../../analyser/APIClient';
import TextOverText from '../TextOverText';

// stylesheet for the Summary section
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoBox: {
      outlineStyle: 'solid',
      outlineColor: 'ba',
      outlineWidth: '0.15rem',
      margin: '1rem 0',
    },
    vl: {
      margin: '0.5rem 1rem',
      height: '4rem',
      alignSelf: 'center',
      // TODO: use theme color
      borderColor: 'grey',
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
const DetailsOverviewInfoBox: React.FC<DetailsOverviewProps> = ({
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
      <Grid
        container
        xs={12}
        justify="space-around"
        direction="row"
        className={classes.infoBox}
      >
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
    </>
  );
};

export default DetailsOverviewInfoBox;

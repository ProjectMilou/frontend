import React from 'react';
import { useTheme, makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ValueOverName from './ValueOverName';
import { Position, RiskAnalysis } from './DetailsTypes';
import DetailsDonut from './DetailsDonut';
import StockChart from '../shared/StockChart';

// stylesheet for the Summary section
const useStyles = makeStyles(() =>
  createStyles({
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
    lineChartWrapper: {
      width: '40rem',
      height: '20rem',
      flexBasis: '60%',
    },
  })
);

// type declarations
type DetailsMainSummaryProps = {
  // total score of the portfolio
  score: number;
  // seven day moving average of the portfolio
  perf7d: number;
  // one year moving average of the portfolio
  perf1y: number;
  // total value of the portfolio
  value: number;
  // number of positions
  positionCount: number;
  // all risk fields (country, industry, currency)
  risk: RiskAnalysis;
  // array with all positions
  positions: Position[];
  // performance values for the total value of the portfolio over time with unix timestamp
  performance: number[][];
};

// returns the details page header
const DetailsMainSummary: React.FC<DetailsMainSummaryProps> = ({
  score,
  perf7d,
  perf1y,
  value,
  positionCount,
  risk,
  positions,
  performance,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

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

  const portions = positions.map((p) => p.qty * p.stock.price);
  const companyNames = positions.map((p) => p.stock.name);

  return (
    <>
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
              name={t('portfolio.details.score')}
              valueColor={convertScoreToColor(score)}
            />
          </div>
          {/* devider 1 */}
          <hr className={classes.vl} />
          {/* box section 2 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '35%' }}
          >
            {/* 7 day moving average */}
            <ValueOverName
              value={`${perf7d}%`}
              name={t('portfolio.details.day7')}
              valueColor={convertPercentToColor(perf7d)}
            />
            {/* 1 year moving average */}
            <ValueOverName
              value={`${perf1y}%`}
              name={t('portfolio.details.year')}
              valueColor={convertPercentToColor(perf1y)}
            />
            {/* total value */}
            <ValueOverName
              // TODO: change to euro sign
              value={`$${value}`}
              name={t('portfolio.details.totalValue')}
              valueColor={theme.palette.primary.contrastText}
            />
          </div>
          {/* devider 2 */}
          <hr className={classes.vl} />
          {/* box section 3 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* positions */}
            <ValueOverName
              value={`${positionCount}`}
              name={t('portfolio.details.positions')}
              valueColor={theme.palette.primary.contrastText}
            />
            {/* countries */}
            <ValueOverName
              // TODO: replace countries.score with correct value
              value={`${risk.countries.score}`}
              name={t('portfolio.details.countries')}
              valueColor={convertScoreToColor(risk.countries.score)}
            />
            {/* industries */}
            <ValueOverName
              // TODO: replace segments.score with correct value
              value={`${risk.segments.score}%`}
              name={t('portfolio.details.industries')}
              valueColor={convertScoreToColor(risk.segments.score)}
            />
            {/* currencies */}
            <ValueOverName
              // TODO: replace currency.score with correct value
              value={`${risk.currency.score}%`}
              name={t('portfolio.details.currencies')}
              valueColor={convertScoreToColor(risk.currency.score)}
            />
          </div>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <div className={classes.pieChartWrapper}>
          <DetailsDonut
            portions={portions}
            labels={companyNames}
            size={600}
            graphOffsetX={0}
            showLegendOnScale
          />
        </div>
        <div className={classes.lineChartWrapper}>
          <StockChart
            series={performance}
            axisColor={theme.palette.primary.contrastText}
            buttonBackgroundColor={theme.palette.primary.light}
            buttonTextColor={theme.palette.primary.contrastText}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default DetailsMainSummary;

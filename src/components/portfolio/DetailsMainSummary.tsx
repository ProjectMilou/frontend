import React from 'react';
import { useTheme, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ValueOverName from './ValueOverName';
import { RiskAnalysis } from './DetailsTypes';

// stylesheet for the Summary section
const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: palette.primary.contrastText,
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
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
      margin: '1rem auto',
      maxWidth: '80rem',
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
};

// returns the details page header
const DetailsMainSummary: React.FC<DetailsMainSummaryProps> = ({
  score,
  perf7d,
  perf1y,
  value,
  positionCount,
  risk,
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

  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>{t('summaryHeader')}</h2>
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
              name={t('score')}
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
              name={t('day7')}
              valueColor={convertPercentToColor(perf7d)}
            />
            {/* 1 year moving average */}
            <ValueOverName
              value={`${perf1y}%`}
              name={t('year')}
              valueColor={convertPercentToColor(perf1y)}
            />
            {/* total value */}
            <ValueOverName
              // TODO: change to euro sign
              value={`$${value}`}
              name={t('totalValue')}
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
              name={t('positions')}
              valueColor={theme.palette.primary.contrastText}
            />
            {/* countries */}
            <ValueOverName
              // TODO: replace countries.score with correct value
              value={`${risk.countries.score}`}
              name={t('countries')}
              valueColor={convertScoreToColor(risk.countries.score)}
            />
            {/* industries */}
            <ValueOverName
              // TODO: replace segments.score with correct value
              value={`${risk.segments.score}%`}
              name={t('industries')}
              valueColor={convertScoreToColor(risk.segments.score)}
            />
            {/* currencies */}
            <ValueOverName
              // TODO: replace currency.score with correct value
              value={`${risk.currency.score}%`}
              name={t('currencies')}
              valueColor={convertScoreToColor(risk.currency.score)}
            />
          </div>
        </div>
      </div>
      <div>{/* Summary pie */}</div>
      <div>{/* Summary line */}</div>
    </div>
  );
};

export default DetailsMainSummary;

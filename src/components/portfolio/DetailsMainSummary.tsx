import React from 'react';
import { makeStyles, createStyles, darken } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ValueOverName from './ValueOverName';
import DetailsDonut from './DetailsDonut';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import PortfolioPerformance from './PortfolioPerformance';

// stylesheet for the Summary section
const useStyles = makeStyles(({ palette }) =>
  createStyles({
    infoBox: {
      outlineStyle: 'solid',
      outlineColor: darken(palette.primary.contrastText, 0.5),
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
      color: palette.primary.contrastText,
    },
    vl: {
      margin: '0.5rem 1rem',
      height: '4rem',
      alignSelf: 'center',
      borderColor: darken(palette.primary.contrastText, 0.5),
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    pieChartWrapper: {
      flexBasis: '35%',
    },
    lineChartWrapper: {
      width: '40rem',
      flexBasis: '65%',
    },
    missingInfo: {
      height: 'min-content',
      alignSelf: 'center',
      color: palette.primary.contrastText,
      fontSize: '1rem',
    },
  })
);

// type declarations
type DetailsMainSummaryProps = {
  portfolio: NonEmptyPortfolioDetails;
  id: string;
};

// returns the details page header
const DetailsMainSummary: React.FC<DetailsMainSummaryProps> = ({
  portfolio,
  id,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const sortedPos = portfolio.positions.sort(
    (a, b) => b.qty * b.stock.price - a.qty * a.stock.price
  );

  const portions = sortedPos.map((p) => p.qty * p.stock.price);
  const companyNames = sortedPos.map((p) => p.stock.name);

  return (
    <>
      <div className={classes.infoBox}>
        <div className={classes.infoValueContainer}>
          {/* box section 1 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '35%' }}
          >
            {/* 7 day moving average */}
            <ValueOverName
              value={
                <StyledNumberFormat
                  value={portfolio.overview.perf7d}
                  suffix="%"
                  paintJob
                />
              }
              name={t('portfolio.details.day7')}
            />
            {/* 1 year moving average */}
            <ValueOverName
              value={
                <StyledNumberFormat
                  value={portfolio.overview.perf1y}
                  suffix="%"
                  paintJob
                />
              }
              name={t('portfolio.details.year')}
            />
            {/* total value */}
            <ValueOverName
              value={
                <StyledNumberFormat
                  value={portfolio.overview.value}
                  suffix="€"
                  doLimit
                />
              }
              name={t('portfolio.details.totalValue')}
            />
          </div>
          {/* divider 1 */}
          <hr className={classes.vl} />
          {/* box section 2 */}
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '55%' }}
          >
            {/* positions */}
            <ValueOverName
              value={portfolio.overview.positionCount}
              name={t('portfolio.details.positions')}
            />
            {/* check if the risk information is missing */}
            {!portfolio.risk ||
            Object.keys(portfolio.risk).length === 0 ||
            Object.keys(portfolio.risk.countries).length === 0 ||
            Object.keys(portfolio.risk.segments).length === 0 ||
            Object.keys(portfolio.risk.currency).length === 0 ? (
              <span className={classes.missingInfo}>
                {t('portfolio.details.summary.missingDiversification')}
              </span>
            ) : (
              <>
                {/* countries */}
                <ValueOverName
                  value={Object.keys(portfolio.risk.countries).length}
                  name={t('portfolio.details.countries')}
                />
                {/* industries */}
                <ValueOverName
                  value={Object.keys(portfolio.risk.segments).length}
                  name={t('portfolio.details.segments')}
                />
                {/* currencies */}
                <ValueOverName
                  value={Object.keys(portfolio.risk.currency).length}
                  name={t('portfolio.details.currencies')}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <div className={classes.pieChartWrapper}>
          <DetailsDonut portions={portions} labels={companyNames} size={300} />
        </div>
        <div className={classes.lineChartWrapper}>
          <PortfolioPerformance id={id} />
        </div>
      </div>
    </>
  );
};

export default DetailsMainSummary;

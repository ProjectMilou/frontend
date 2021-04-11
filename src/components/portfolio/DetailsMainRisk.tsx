import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import DetailsDonut from './DetailsDonut';
import { Position, Risk, RiskAnalysis } from '../../portfolio/APIClient';
import { riskPortions } from '../../portfolio/Risk';
import StyledNumberFormat from '../shared/StyledNumberFormat';

// stylesheet for the risk analysis section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    sharpeText: {
      width: 'min-content',
      margin: '4rem auto',
      padding: '1rem',
      color: palette.primary.contrastText,
      fontSize: '1.5rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      borderStyle: 'solid',
      borderRadius: '0.75rem',
      borderColor: palette.primary.contrastText,
    },
    riskWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    riskTitle: {
      fontSize: '1.4rem',
      margin: '0 0 1rem 0',
      color: palette.primary.contrastText,
    },
    riskPieWrapper: {
      margin: '1rem 0',
      width: '100%',
      alignSelf: 'center',
    },
    statContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    iconWrapper: {
      display: 'flex',
      height: '4rem',
      width: '4rem',
    },
    countWrapper: {
      fontSize: '1.5rem',
      marginRight: '1rem',
    },
    subtitleWrapper: {
      width: '100%',
      fontSize: '1.15rem',
      fontWeight: 600,
      color: palette.primary.contrastText,
    },
    warnings: {
      margin: '0.1rem 0',
      fontSize: '1rem',
      color: palette.primary.contrastText,
    },
  })
);

// type declarations
type RiskCompProps = {
  risk: Risk;
  title: string;
  labels: string[];
  portions: number[];
};

type DetailsMainRiskProps = {
  risk: RiskAnalysis;
  positions: Position[];
};

// A component consisting of the title, chart and warnings of a given risk type
const RiskComp: React.FC<RiskCompProps> = ({
  risk,
  title,
  labels,
  portions,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: no hard coded colors
  // TODO: update range to fit data from analytics
  // convert a score to a color
  function convertScoreToColor(val: number): string {
    return val < 0.5 ? '#D64745' : '#50E2A8';
  }

  function convertScoreToIcon(val: number): React.ReactElement {
    const iconStyle = {
      color: convertScoreToColor(val),
      width: '100%',
      height: '100%',
    };

    return val < 0.5 ? (
      <PriorityHighIcon style={iconStyle} aria-label="exclamationMark" />
    ) : (
      <CheckIcon style={iconStyle} aria-label="checkMark" />
    );
  }

  return (
    <div className={classes.riskWrapper}>
      {/* title */}
      <div>
        <p className={classes.riskTitle}>{title}</p>
      </div>
      {/* body with chart */}
      <div className={classes.riskPieWrapper}>
        <DetailsDonut
          portions={portions}
          labels={labels}
          size={200}
          graphOffsetX={-40}
          showLegendOnScale={false}
        />
      </div>
      {/* footer with warnings */}
      <div>
        {/* icon + number + title */}
        <div className={classes.statContainer}>
          <div className={classes.iconWrapper}>
            {convertScoreToIcon(risk.score)}
          </div>
          <div className={classes.countWrapper}>
            <div style={{ color: convertScoreToColor(risk.score) }}>
              {risk.count}
            </div>
          </div>
          <div className={classes.subtitleWrapper}>
            <p>{title}</p>
          </div>
        </div>
        {/* warnings */}
        <div>
          {risk.warnings.map((w) => (
            <p key={w} className={classes.warnings}>
              {t(w)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// returns the details page header
const DetailsMainRisk: React.FC<DetailsMainRiskProps> = ({
  risk,
  positions,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const { t } = useTranslation();

  const countriesRisk = React.useMemo(
    () => riskPortions(positions, (p) => p.stock.country),
    [positions]
  );

  const segmentsRisk = React.useMemo(
    () => riskPortions(positions, (p) => p.stock.industry),
    [positions]
  );

  const currencyRisk = React.useMemo(
    () => riskPortions(positions, (p) => p.stock.currency),
    [positions]
  );

  // TODO: use actual sharpe ratio
  const sharpeRatio = 1;

  return (
    <>
      <Typography className={classes.sharpeText}>
        {t('portfolio.details.sharpe')}
        <StyledNumberFormat
          value={sharpeRatio}
          suffix=""
          paintJob={
            // eslint-disable-next-line no-nested-ternary
            sharpeRatio < 1
              ? palette.error.main
              : sharpeRatio < 2
              ? palette.warning.main
              : palette.success.main
          }
        />
      </Typography>
      <div className={classes.riskContainer}>
        <RiskComp
          risk={risk.countries}
          title={t('portfolio.details.countries')}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(countriesRisk)}
          portions={Object.values(countriesRisk)}
        />
        <RiskComp
          risk={risk.segments}
          title={t('portfolio.details.segments')}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(segmentsRisk)}
          portions={Object.values(segmentsRisk)}
        />
        <RiskComp
          risk={risk.currency}
          title={t('portfolio.details.currency')}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(currencyRisk)}
          portions={Object.values(currencyRisk)}
        />
      </div>
    </>
  );
};

export default DetailsMainRisk;

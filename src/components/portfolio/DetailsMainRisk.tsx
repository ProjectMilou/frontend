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
import WarningIcon from '@material-ui/icons/Warning';
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
    ratioWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: '4rem 0',
    },
    ratioText: {
      width: 'min-content',
      margin: '0 4rem',
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
    icon: {
      width: '100%',
      height: '100%',
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
  // a score determined by the parent component: 0 - bad | 1 - ok |  2 - good
  score: number;
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
  score,
  title,
  labels,
  portions,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  // convert a score to a color
  const scoreColor =
    // eslint-disable-next-line no-nested-ternary
    score === 0
      ? theme.palette.error.main
      : score === 1
      ? theme.palette.warning.main
      : theme.palette.success.main;

  // convert a score to an icon
  const scoreIcon =
    // eslint-disable-next-line no-nested-ternary
    score === 0 ? (
      <PriorityHighIcon
        style={{ color: theme.palette.error.main }}
        className={classes.icon}
        aria-label="exclamationIcon"
      />
    ) : score === 1 ? (
      <WarningIcon
        style={{ color: theme.palette.warning.main }}
        className={classes.icon}
        aria-label="waringIcon"
      />
    ) : (
      <CheckIcon
        style={{ color: theme.palette.success.main }}
        className={classes.icon}
        aria-label="checkIcon"
      />
    );

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
          <div className={classes.iconWrapper}>{scoreIcon}</div>
          <div className={classes.countWrapper}>
            <div style={{ color: scoreColor }}>{risk.count}</div>
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

  const treynorRatio = 1;

  return (
    <>
      <div className={classes.ratioWrapper}>
        <Typography className={classes.ratioText}>
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
        <Typography className={classes.ratioText}>
          {t('portfolio.details.treynor')}
          <StyledNumberFormat
            value={treynorRatio}
            suffix=""
            paintJob={
              // eslint-disable-next-line no-nested-ternary
              treynorRatio < 1
                ? palette.error.main
                : treynorRatio < 2
                ? palette.warning.main
                : palette.success.main
            }
          />
        </Typography>
      </div>
      <div className={classes.riskContainer}>
        <RiskComp
          risk={risk.countries}
          title={t('portfolio.details.countries')}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(countriesRisk)}
          portions={Object.values(countriesRisk)}
          score={
            // eslint-disable-next-line no-nested-ternary
            risk.countries.count < 3 ? 0 : risk.countries.count < 5 ? 1 : 2
          }
        />
        <RiskComp
          risk={risk.segments}
          title={t('portfolio.details.industries')}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(segmentsRisk)}
          portions={Object.values(segmentsRisk)}
          score={
            // eslint-disable-next-line no-nested-ternary
            risk.segments.count < 5 ? 0 : risk.segments.count < 9 ? 1 : 2
          }
        />
        <RiskComp
          risk={risk.currency}
          title={t('portfolio.details.currencies')}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(currencyRisk)}
          portions={Object.values(currencyRisk)}
          score={
            // eslint-disable-next-line no-nested-ternary
            risk.currency.count < 3 ? 0 : risk.currency.count < 5 ? 1 : 2
          }
        />
      </div>
    </>
  );
};

export default DetailsMainRisk;

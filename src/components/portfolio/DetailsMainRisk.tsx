import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  darken,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import DetailsDonut from './DetailsDonut';
import { RiskAnalysis } from '../../portfolio/APIClient';
import { RiskBundle, getRiskBundle } from '../../portfolio/Helper';
import InfoButton from '../shared/InfoButton';
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
      display: 'flex',
      justifyContent: 'space-between',
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
    ratioName: {
      marginRight: '0.5rem',
    },
  })
);

// type declarations
type RiskCompProps = {
  title: string;
  bundle: RiskBundle;
  labels: string[];
  portions: number[];
};

type DetailsMainRiskProps = {
  risk: RiskAnalysis;
  sharpeRatio: number;
  treynorRatio: number;
};

// A component consisting of the title, chart and warnings of a given risk type
const RiskComp: React.FC<RiskCompProps> = ({
  title,
  bundle,
  labels,
  portions,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.riskWrapper}>
      {/* title */}
      <div>
        <span className={classes.riskTitle}>{title}</span>
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
          <div className={classes.iconWrapper}>{bundle.riskIcon}</div>
          <div className={classes.countWrapper}>
            <div style={{ color: bundle.riskColor }}>{bundle.count}</div>
          </div>
          <div className={classes.subtitleWrapper}>
            <span>{title}</span>
          </div>
        </div>
        {/* warnings */}
        <div>
          {bundle.warnings.map((w) => (
            <span key={w} className={classes.warnings}>
              {t(w)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// returns the details page header
const DetailsMainRisk: React.FC<DetailsMainRiskProps> = ({
  risk,
  sharpeRatio,
  treynorRatio,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const { t } = useTranslation();

  const red = palette.error.main;
  const yellow = palette.warning.main;
  const green = palette.success.main;

  function ratioToColor(ratio: number): string {
    switch (true) {
      case ratio < 0.5:
        return red;
      case ratio < 1:
        return yellow;
      case ratio < 2:
        return darken(green, 0.25);
      default:
        return green;
    }
  }

  return (
    <>
      <div className={classes.ratioWrapper}>
        <Typography className={classes.ratioText}>
          <span className={classes.ratioName}>
            {t('portfolio.details.sharpe')}
          </span>
          <StyledNumberFormat
            value={sharpeRatio}
            suffix=""
            paintJob={ratioToColor(sharpeRatio)}
          />
          <InfoButton
            infotext={t('analyser.details.Volatility.SharpeRatio.infoButton')}
          />
        </Typography>
        <Typography className={classes.ratioText}>
          <span className={classes.ratioName}>
            {t('portfolio.details.treynor')}
          </span>
          <StyledNumberFormat
            value={treynorRatio}
            suffix=""
            paintJob={ratioToColor(treynorRatio)}
          />
          <InfoButton
            infotext={t('analyser.details.Volatility.TreynorRatio.infoButton')}
          />
        </Typography>
      </div>
      <div className={classes.riskContainer}>
        <RiskComp
          title={t('portfolio.details.countries')}
          bundle={getRiskBundle(
            'country',
            Object.entries(risk.countries).length,
            3,
            5,
            red,
            yellow,
            green
          )}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(risk.countries)}
          portions={Object.values(risk.countries)}
        />
        <RiskComp
          title={t('portfolio.details.segments')}
          bundle={getRiskBundle(
            'segment',
            Object.entries(risk.segments).length,
            4,
            6,
            red,
            yellow,
            green
          )}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(risk.segments)}
          portions={Object.values(risk.segments)}
        />
        <RiskComp
          title={t('portfolio.details.currencies')}
          bundle={getRiskBundle(
            'currency',
            Object.entries(risk.currency).length,
            2,
            4,
            red,
            yellow,
            green
          )}
          // TODO: deal with overflow (too many names)
          labels={Object.keys(risk.currency)}
          portions={Object.values(risk.currency)}
        />
      </div>
    </>
  );
};

export default DetailsMainRisk;

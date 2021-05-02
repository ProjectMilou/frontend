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
import { RiskAnalysis, Diversification } from '../../portfolio/APIClient';
import { RiskBundle, getRiskBundle } from '../../portfolio/Helper';
import InfoButton from '../shared/InfoButton';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import NoInfoAvailable from './NoInfoAvailable';

// stylesheet for the risk analysis section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    riskContainer: {
      display: 'flex',
      flexDirection: 'column',
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
      justifyContent: 'space-around',
    },
    riskCompWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      margin: '0 1rem',
    },
    riskTitle: {
      fontSize: '1.4rem',
      margin: '0 0 1rem 0',
      color: palette.primary.contrastText,
    },
    riskPieWrapper: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1rem 0',
      width: '100%',
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
    warningsWrapper: {
      textAlign: 'center',
    },
    warnings: {
      margin: '0.15rem',
      fontSize: '1rem',
      color: palette.primary.contrastText,
      'word-wrap': 'anywhere',
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
};

type DetailsMainRiskProps = {
  risk: RiskAnalysis;
  sharpeRatio: number;
  treynorRatio: number;
};

// A component consisting of the title, chart and warnings of a given risk type
const RiskComp: React.FC<RiskCompProps> = ({ title, bundle }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.riskCompWrapper}>
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
      <div className={classes.warningsWrapper}>
        {bundle.warnings.map((w) => (
          <span key={w} className={classes.warnings}>
            {t(w)}
          </span>
        ))}
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

  function sort(type: Diversification) {
    return Object.entries(type).sort((a, b) => b[1] - a[1]);
  }

  // if no data for the risk section is provided render place holder text instead
  if (
    Object.entries(risk.countries).length === 0 ||
    Object.entries(risk.segments).length === 0 ||
    Object.entries(risk.currency).length === 0
  )
    return <NoInfoAvailable />;

  return (
    <>
      <div className={classes.ratioWrapper}>
        <Typography className={classes.ratioText}>
          <span className={classes.ratioName}>
            {t('portfolio.details.sharpe')}
          </span>
          <StyledNumberFormat
            value={sharpeRatio}
            paintJob={ratioToColor(sharpeRatio)}
          />
          <InfoButton
            infotext={`${t(
              `analyser.details.Volatility.SharpeRatio.infoButton`
            )}\n\n${t('source.investopedia')}`}
          />
        </Typography>
        <Typography className={classes.ratioText}>
          <span className={classes.ratioName}>
            {t('portfolio.details.treynor')}
          </span>
          <StyledNumberFormat
            value={treynorRatio}
            paintJob={ratioToColor(treynorRatio)}
          />
          <InfoButton
            infotext={`${t(
              `analyser.details.Volatility.TreynorRatio.infoButton`
            )}\n\n${t('source.investopedia')}`}
          />
        </Typography>
      </div>
      <div className={classes.riskContainer}>
        <div className={classes.riskWrapper}>
          <span className={classes.riskTitle}>
            {t('portfolio.details.countries')}
          </span>
          <span className={classes.riskTitle}>
            {t('portfolio.details.segments')}
          </span>
          <span className={classes.riskTitle}>
            {t('portfolio.details.currencies')}
          </span>
        </div>
        <div className={classes.riskWrapper}>
          <DetailsDonut
            portions={sort(risk.countries).map((sc) => sc[1])}
            labels={sort(risk.countries).map((sc) => sc[0])}
            size={200}
          />
          <DetailsDonut
            portions={sort(risk.segments).map((sc) => sc[1])}
            labels={sort(risk.segments).map((sc) => sc[0])}
            size={200}
          />
          <DetailsDonut
            portions={sort(risk.currency).map((sc) => sc[1])}
            labels={sort(risk.currency).map((sc) => sc[0])}
            size={200}
          />
        </div>
        <div className={classes.riskWrapper}>
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
          />
        </div>
      </div>
    </>
  );
};

export default DetailsMainRisk;

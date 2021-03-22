import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { RiskAnalysis, Risk } from './DetailsTypes';

// stylesheet for the risk analysis section
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
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      // TODO: use theme color
      borderColor: '#EEF1FB',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
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
    riskPie: {
      // TODO: change once pie chart is inserted
      width: '90%',
      height: '12rem',
      backgroundColor: 'grey',
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
      // TODO: change to theme color
      color: '#EEF1FB',
    },
  })
);

// type declarations
type RiskCompProps = {
  risk: Risk;
  title: string;
};

type DetailsMainRiskProps = {
  risk: RiskAnalysis;
};

// A component consisting of the title, chart and warnings of a given risk type
const RiskComp: React.FC<RiskCompProps> = ({ risk, title }) => {
  const [riskState, setRiskState] = React.useState(risk);
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
      {/* TODO: insert chart */}
      <div className={classes.riskPie}>
        <div />
      </div>
      {/* footer with warnings */}
      <div>
        {/* icon + number + title */}
        <div className={classes.statContainer}>
          <div className={classes.iconWrapper}>
            {convertScoreToIcon(risk.score)}
          </div>
          <div className={classes.countWrapper}>
            {/* TODO: change to actuall count, not score */}
            <p style={{ color: convertScoreToColor(risk.score), margin: 0 }}>
              {risk.score}
            </p>
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
const DetailsMainRisk: React.FC<DetailsMainRiskProps> = ({ risk }) => {
  const [riskState, setRiskState] = React.useState(risk);
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>{t('port.details.risk')}</h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      <div className={classes.riskContainer}>
        <RiskComp risk={risk.countries} title={t('port.details.countries')} />
        <RiskComp risk={risk.segments} title={t('port.details.segments')} />
        <RiskComp risk={risk.currency} title={t('port.details.currency')} />
      </div>
    </div>
  );
};

export default DetailsMainRisk;

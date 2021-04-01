import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DetailsMainSummary from './DetailsMainSummary';
import DetailsMainPositions from './DetailsMainPositions';
import DetailsMainRisk from './DetailsMainRisk';
import DetailsMainKeyFigures from './DetailsMainKeyFigures';
import DetailsMainDividens from './DetailsMainDividends';
import DetailsMainAnalyst from './DetailsMainAnalyst';
import DetailMainBacktesting from './DetailsMainBacktesting';
import { RiskAnalysis, Position, KeyFigures } from './DetailsTypes';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    mainWrapper: {
      // TODO use theme margin
      margin: '0 auto',
      padding: '0 4rem',
      // TODO: use theme max-width
      maxWidth: '80rem',
    },
    sectionWrapper: {
      padding: '2rem 0',
    },
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
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
  })
);

type SectionProps = {
  title: string;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.sectionWrapper}>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>{title}</h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      {children}
    </div>
  );
};

type DetailsMainProps = {
  positionCount: number;
  value: number;
  score: number;
  perf7d: number;
  perf1y: number;
  risk: RiskAnalysis;
  positions: Position[];
  figures: KeyFigures[];
  nextDividend: number;
  dividendPayoutRatio: number;
};

const DetailsMain: React.FC<DetailsMainProps> = ({
  positionCount,
  value,
  score,
  perf1y,
  perf7d,
  risk,
  positions,
  figures,
  nextDividend,
  dividendPayoutRatio,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.mainWrapper}>
      <Section title={t('portfolio.details.summaryHeader')}>
        <DetailsMainSummary
          positionCount={positionCount}
          value={value}
          score={score}
          perf1y={perf1y}
          perf7d={perf7d}
          risk={risk}
          positions={positions}
        />
      </Section>
      <Section title={t('portfolio.details.positionsTitle')}>
        <DetailsMainPositions positions={positions} />
      </Section>
      <Section title={t('portfolio.details.risk')}>
        <DetailsMainRisk risk={risk} positions={positions} />
      </Section>
      <Section title={t('portfolio.details.keyfigures')}>
        <DetailsMainKeyFigures figures={figures} />
      </Section>
      <Section title={t('portfolio.details.dividends')}>
        <DetailsMainDividens
          nextDividend={nextDividend}
          dividendPayoutRatio={dividendPayoutRatio}
        />
      </Section>
      <Section title={t('portfolio.details.analyst')}>
        <DetailsMainAnalyst />
      </Section>
      <Section title={t('portfolio.details.backtesting')}>
        <DetailMainBacktesting />
      </Section>
    </div>
  );
};

export default DetailsMain;

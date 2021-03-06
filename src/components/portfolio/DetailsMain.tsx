import React from 'react';
import { makeStyles, createStyles, darken } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DetailsMainSummary from './DetailsMainSummary';
import DetailsMainPositions from './DetailsMainPositions';
import DetailsMainRisk from './DetailsMainRisk';
import DetailsMainKeyFigures from './DetailsMainKeyFigures';
import DetailsMainDividens from './DetailsMainDividends';
import DetailsMainAnalyst from './DetailsMainAnalyst';
import { Stock, NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import DetailsMainAnalytics from './DetailsMainAnalytics';
import DetailMainBacktesting from './DetailsMainBacktesting';
import LimitedString from './LimitedString';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    mainWrapper: {
      margin: '0 auto',
      padding: '0 4rem',
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
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
      color: darken(palette.primary.contrastText, 0.5),
    },
    missingDataMessageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '2rem 1rem',
      fontSize: '1rem',
      color: palette.primary.contrastText,
    },
    stockSymbols: {
      marginTop: '0.5rem',
      fontWeight: 600,
      'word-wrap': 'anywhere',
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

type MissingDataMessageProps = {
  stocks: Stock[];
};

const MissingDataMessage: React.FC<MissingDataMessageProps> = ({ stocks }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.missingDataMessageWrapper}>
      <span>{t('portfolio.details.missingDataMessage')}</span>
      <div className={classes.stockSymbols}>
        <LimitedString
          value={stocks.map((s) => s.symbol).join(', ')}
          length={300}
        />
      </div>
    </div>
  );
};

type DetailsMainProps = {
  portfolio: NonEmptyPortfolioDetails;
  id: string;
};

const DetailsMain: React.FC<DetailsMainProps> = ({ portfolio, id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const stocksWithMissingInfo = portfolio.positions
    .map((position) => position.stock)
    .filter((stock) => stock.missingData);
  /**
   * This is the portfolio without the stocks that are missing data. This will be supplied anywhere except summary and positions section.
   * Thus stocks with missing data will not be taken into consideration e.g. in the analytics or dividends section.
   */
  const portfolioWithoutMissingData = {
    ...portfolio,
    positions: portfolio.positions.filter((pos) => !pos.stock.missingData),
  };

  return (
    <div className={classes.mainWrapper}>
      <Section title={t('portfolio.details.summaryHeader')}>
        {stocksWithMissingInfo.length > 0 && (
          <MissingDataMessage stocks={stocksWithMissingInfo} />
        )}
        <DetailsMainSummary portfolio={portfolio} id={id} />
      </Section>
      <Section title={t('portfolio.details.positionsTitle')}>
        <DetailsMainPositions positions={portfolio.positions} />
      </Section>
      <Section title={t('portfolio.details.risk')}>
        <DetailsMainRisk
          risk={portfolio.risk}
          sharpeRatio={portfolio.analytics.sharpeRatio}
          treynorRatio={portfolio.analytics.treynorRatio}
        />
      </Section>
      <Section title={t('portfolio.details.keyfigures')}>
        <DetailsMainKeyFigures figures={portfolio.keyFigures} />
      </Section>
      <Section title={t('portfolio.details.dividends')}>
        <DetailsMainDividens portfolio={portfolioWithoutMissingData} />
      </Section>
      <Section title={t('portfolio.details.analyst')}>
        <DetailsMainAnalyst positions={portfolioWithoutMissingData.positions} />
      </Section>
      <Section title={t('portfolio.details.analytics')}>
        <DetailsMainAnalytics portfolio={portfolioWithoutMissingData} />
      </Section>
      <Section title={t('portfolio.details.backtesting')}>
        {/* TODO handle stocks with missing */}
        <DetailMainBacktesting id={id} />
      </Section>
    </div>
  );
};

export default DetailsMain;

import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import RatioDonut from '../shared/RatioDonut';
import DividendLineChart from '../shared/DividendLineChart';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import InfoButton from '../shared/InfoButton';
import StyledNumberFormat from '../shared/StyledNumberFormat';

// stylesheet for the dividend section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    dividendsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
    chartContainer: {
      height: '100%',
      width: '100%',
      flexBasis: '65%',
    },
    infoContainer: {
      height: '100%',
      width: '100%',
      flexBasis: '35%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: '1rem',
    },
    infoWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoBody: {
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.contrastText,
      fontSize: '1.15rem',
    },
    infoTitle: {
      color: palette.primary.contrastText,
      fontSize: '1.25rem',
      fontWeight: 600,
      display: 'flex',
    },
    infoTitleP: {
      margin: '0.5rem 0',
    },
    placeholderInfo: {
      display: 'flex',
      margin: '15rem 0',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.contrastText,
      fontSize: '1.15rem',
    },
  })
);

// type declarations
type DetailsMainDividendsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

// type declarations
type InfoBlockProps = {
  title: string;
  infoText: string;
};

/**
 *
 * @param title - The title to display
 * @param infoText - The information to be displayed when the info icon is hovered
 * @param children - The body of this InfoBlock
 * @returns A small infoblock used in the dividends section
 */
const InfoBlock: React.FC<InfoBlockProps> = ({ title, children, infoText }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <span className={classes.infoTitleP}>{title}</span>
        <InfoButton infotext={infoText} />
      </div>
      <div className={classes.infoBody}>{children}</div>
    </div>
  );
};

/**
 * This component represent the dividend section of the prtfolio details page.
 * It consists of one larger historic chart, a dividend yield, a dividend payout ratio graph
 * and the next dividend payout date. If no data is available only a string will be displayed.
 *
 * @param portfolio - The portfolio from which the dividend information is derived
 */

const DetailsMainDividends: React.FC<DetailsMainDividendsProps> = ({
  portfolio,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const series = [
    {
      name: t('portfolio.details.divPayout'),
      type: 'column',
      data: portfolio.keyFigures.map((k) => k.dividendPayoutRatio),
    },
    {
      name: t('portfolio.details.divYield'),
      type: 'line',
      data: portfolio.keyFigures.map((k) => k.div),
    },
  ];

  if (portfolio.keyFigures.length !== 0) {
    return (
      <div className={classes.dividendsWrapper}>
        <div className={classes.chartContainer}>
          {/* left side with graph */}
          <DividendLineChart
            series={series}
            height={450}
            textColor={theme.palette.primary.contrastText}
            year={portfolio.keyFigures[0].year}
          />
        </div>
        <div className={classes.infoContainer}>
          {/* right side with info */}
          <InfoBlock
            title={t('portfolio.details.divYield')}
            infoText={`${t('analyser.details.DividendYield.infoButton')}\n\n${t(
              'source.investopedia'
            )}`}
          >
            <StyledNumberFormat
              value={portfolio.keyFigures[portfolio.keyFigures.length - 1].div}
            />
          </InfoBlock>
          <InfoBlock
            title={t('portfolio.details.divPayout')}
            infoText={`${t(
              'analyser.details.DividendPayoutRatio.infoButton'
            )}\n\n${t('source.investopedia')}`}
          >
            <RatioDonut
              ratio={
                portfolio.keyFigures[portfolio.keyFigures.length - 1]
                  .dividendPayoutRatio
              }
              textColor={theme.palette.primary.contrastText}
            />
          </InfoBlock>
          <InfoBlock
            title={t('portfolio.details.nextDate')}
            infoText={t('analyser.details.NextDate.infoButton')}
          >
            {portfolio.nextDividend.toISOString().split('T')[0]}
          </InfoBlock>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.placeholderInfo}>
      {t('portfolio.details.emptyKeyFigures')}
    </div>
  );
};

export default DetailsMainDividends;

import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import RatioDonut from '../shared/RatioDonut';
import KeyFiguresChart from '../shared/KeyFiguresChart';

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
    },
    infoTitleP: {
      margin: '0.5rem 0',
    },
  })
);

// type declarations
type DetailsMainDividendsProps = {
  nextDividend: number;
  dividendPayoutRatio: number;
};

// type declarations
type InfoBlockProps = {
  title: string;
};

// returns the details page header
const InfoBlock: React.FC<InfoBlockProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <p className={classes.infoTitleP}>{title}</p>
      </div>
      <div className={classes.infoBody}>{children}</div>
    </div>
  );
};

// returns the details page header
const DetailsMainDividends: React.FC<DetailsMainDividendsProps> = ({
  nextDividend,
  dividendPayoutRatio,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const mockSeries = [
    {
      name: 'Dividend Yield',
      data: [30, 40, 45, 50, 50],
    },
  ];

  return (
    <div className={classes.dividendsWrapper}>
      <div className={classes.chartContainer}>
        {/* left side with graph */}
        <KeyFiguresChart
          series={mockSeries}
          height={450}
          textColor={theme.palette.primary.contrastText}
        />
      </div>
      <div className={classes.infoContainer}>
        {/* right side with info */}
        <InfoBlock title={t('portfolio.details.divYield')}>
          <p style={{ margin: 0 }}>tmp</p>
        </InfoBlock>
        <InfoBlock title={t('portfolio.details.payout')}>
          <RatioDonut
            ratio={dividendPayoutRatio}
            textColor={theme.palette.primary.contrastText}
          />
        </InfoBlock>
        <InfoBlock title={t('portfolio.details.nextDate')}>
          <p style={{ margin: 0 }}>
            {new Date(nextDividend * 1000).toDateString()}
          </p>
        </InfoBlock>
      </div>
    </div>
  );
};

export default DetailsMainDividends;

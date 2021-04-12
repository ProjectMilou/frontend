import React from 'react';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import DetailsAnalyticsHeatmap from './DetailsMainAnalyticsHeatmap';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    standardDeviationWrapper: {
      color: palette.primary.contrastText,
      marginBottom: '2em',
      fontSize: '1.5em',
    },
    standardDeviationValue: {
      marginLeft: '1em',
    },
  })
);

type DetailsMainAnalyticsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

const DetailsMainAnalytics: React.FC<DetailsMainAnalyticsProps> = ({
  portfolio,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.standardDeviationWrapper}>
        <span>{t('portfolio.details.analytics.standardDeviation')}</span>
        <span className={classes.standardDeviationValue}>
          <StyledNumberFormat
            value={portfolio.analytics.standardDeviation * 100}
            suffix="%"
          />
        </span>
      </div>
      <DetailsAnalyticsHeatmap portfolio={portfolio} height={350} />
    </>
  );
};

export default DetailsMainAnalytics;

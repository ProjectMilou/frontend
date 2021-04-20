import React from 'react';
import { CircularProgress, makeStyles, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StockChart from '../shared/StockChart';
import { performance, Performance } from '../../portfolio/APIClient';
import ErrorMessage from '../shared/ErrorMessage';

export type PortfolioPerformanceProps = {
  id: string;
};

const useStyles = makeStyles(({ palette }) => ({
  progressContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    display: 'flex',
    height: '100%',
    '& > *': {
      flex: '1',
    },
  },
  infoBody: {
    display: 'flex',
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.primary.contrastText,
    fontSize: '1.15rem',
  },
}));

const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({ id }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const [series, setSeries] = React.useState<Performance | undefined>(
    undefined
  );
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const isMounted = React.useRef<boolean>(true);

  const fetch = async () => {
    setError(undefined);
    try {
      const s = await performance(id);
      if (isMounted.current) {
        setSeries(s);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e);
      }
    }
  };

  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <ErrorMessage
          error={error}
          messageKey="portfolio.performance.errorMessage"
          handling={{ buttonText: 'error.action.retry', action: fetch }}
        />
      </div>
    );
  }

  if (series) {
    return series.length > 0 ? (
      <StockChart
        series={series}
        axisColor={theme.palette.primary.contrastText}
        buttonBackgroundColor={theme.palette.primary.light}
        buttonTextColor={theme.palette.primary.contrastText}
        height={300}
      />
    ) : (
      <div className={classes.infoBody}>
        {t('portfolio.details.emptyPerformance')}
      </div>
    );
  }

  return (
    <div className={classes.progressContainer}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default PortfolioPerformance;

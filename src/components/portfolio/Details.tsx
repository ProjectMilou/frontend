import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  LinearProgress,
  Typography,
  Container,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DetailsHeader from './DetailsHeader';
import DetailsMain from './DetailsMain';
import * as API from '../../portfolio/APIClient';
import { ErrorCode } from '../../Errors';
import ErrorMessage from '../shared/ErrorMessage';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

// stylesheet for the details base component
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    topBanner: {
      backgroundColor: '#EEF1FB',
      width: '100%',
      height: '15rem',
    },
    main: {
      backgroundColor: palette.primary.main,
      width: '100%',
      height: '100%',
      // change to agreed upon minWidth
      minWidth: '50rem',
    },
    container: {
      marginTop: '25px',
    },
  })
);

// props type declaration
export type DetailsProps = {
  token: string;
  id: string;
  // function to return to the dashboard
  back: () => void;
};

// functional component that takes the name of the portfolio and a function to switch back to the dashboard
// returns the entire details page
const Details: React.FC<DetailsProps> = ({ token, id, back }) => {
  const [portfolioDetails, setPortfolioDetails] = React.useState<
    API.PortfolioDetails | undefined
  >();
  const [error, setError] = React.useState<ErrorCode | undefined>(undefined);

  const isMounted = React.useRef(true);

  const fetch = async () => {
    setError(undefined);
    try {
      const details = await API.details(token, id);
      if (isMounted.current) {
        setPortfolioDetails(details);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e.message);
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

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.topBanner}>
        <DetailsHeader
          back={back}
          name={portfolioDetails?.overview.name}
          positions={portfolioDetails?.positions}
          editPositions={async (modifications) => {
            await API.modify(token, id, modifications);
            // reload portfolio details after successful edit
            await fetch();
          }}
        />
      </div>
      {!portfolioDetails && !error && <LinearProgress color="secondary" />}
      {error && (
        <Container className={classes.container}>
          <ErrorMessage
            error={error}
            messageKey="portfolio.details.errorMessage"
            handling={
              error.startsWith('AUTH')
                ? {
                    buttonText: 'error.action.login',
                    action: async () => {
                      // TODO: go back to login
                    },
                  }
                : {
                    buttonText: 'error.action.retry',
                    action: fetch,
                  }
            }
          />
        </Container>
      )}
      {portfolioDetails &&
        (portfolioDetails.overview.positionCount ? (
          <div className={classes.main}>
            <DetailsMain
              portfolio={portfolioDetails as NonEmptyPortfolioDetails}
            />
          </div>
        ) : (
          <Container className={classes.container}>
            <Typography>{t('portfolio.details.emptyPortfolio')}</Typography>
          </Container>
        ))}
    </div>
  );
};

// exports
export default Details;

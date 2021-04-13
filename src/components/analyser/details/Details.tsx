// Based on Portfolio Details
import React from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import {
  LinearProgress,
  makeStyles,
  Container,
  useTheme,
} from '@material-ui/core';
import { isAuthenticationError } from '../../../Errors';
import * as API from '../../../analyser/APIClient';
import ErrorMessage from '../../shared/ErrorMessage';
import DetailsHeader from './DetailsHeader';
import KeyFigures from './KeyFigures';
import DetailsOverview from './DetailsOverview';
import StockChart from '../../shared/StockChart';
import Dividends from './Dividends';
import Risks from './Risks';
import BalanceSheetInfo from './BalanceSheetInfo';
import Analysts from './Analysts';

// props type declaration
export interface DetailsProps extends RouteComponentProps {
  // API token
  token: string;
  // function to return to the dashboard
  back: () => void;
}

const useStyles = makeStyles({
  createButton: {
    marginTop: '25px',
  },
  mainContent: {
    margin: '25px auto',
  },
});

const Details: React.FC<DetailsProps> = ({ token, back }) => {
  const [stockOverview, setStockOverview] = React.useState<API.Stock>();
  const [stockDetails, setStockDetails] = React.useState<API.StockDetails>();
  const [stockPerformance, setStockPerformance] = React.useState<number[][]>([
    [],
  ]);
  const [
    // eslint-disable-next-line
    companyReports,
    setCompanyReports,
  ] = React.useState<API.CompanyReports>();
  // eslint-disable-next-line
  const [analystRecommendations, setAnalystRecommendations] = React.useState<
    API.AnalystsRecommendation[]
  >([]);

  const [performanceAll, setPerformanceAll] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  // get symbol
  const { id } = useParams();
  const symbol: string = id;

  const isMounted = React.useRef(true);

  const convertPerformance = (performance: API.StockHistricPerformanceList) => {
    const unixDataPoints: number[][] = [];
    performance.dataPoints.forEach((p) => {
      const point: number[] = [Date.parse(p.date), p.close];
      unixDataPoints.push(point);
    });
    return unixDataPoints.reverse();
  };

  const fetch = async () => {
    setError(undefined);
    try {
      const sO = await API.stockOverview(token, symbol);
      const sD = await API.stockDetails(token, symbol);
      const sP = await API.stockPerformance(token, symbol, false);
      const cR = await API.companyReports(token, symbol);
      const aR = await API.analystsRecommendations(token, symbol);

      if (isMounted.current) {
        setStockOverview(sO);
        setStockDetails(sD);
        // TODO get unix timestamp from backend and reverse array
        setStockPerformance(convertPerformance(sP));
        setCompanyReports(cR);
        setAnalystRecommendations(aR);
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e);
      }
    }
  };

  // used if more than 5 years of performance is requested
  const fetchAllPerformaneData = async () => {
    try {
      const sP = await API.stockPerformance(token, symbol, true);
      setStockPerformance(convertPerformance(sP));
      setPerformanceAll(true);
    } catch (e) {
      setError(e);
    }
  };

  React.useEffect(() => {
    if (performanceAll) {
      fetchAllPerformaneData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performanceAll]);

  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  const theme = useTheme();

  return (
    <>
      {!stockOverview ||
        (!stockDetails && !error && (
          <div>
            <LinearProgress color="secondary" />
          </div>
        ))}

      {error && (
        <Container maxWidth="lg" className={classes.mainContent}>
          <ErrorMessage
            error={error}
            messageKey="analyser.dashboard.errorMessage"
            handling={
              isAuthenticationError(error)
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
      {stockOverview &&
        stockDetails &&
        companyReports &&
        analystRecommendations && (
          <div>
            <DetailsHeader back={back} details={stockOverview} />
            <Container className={classes.mainContent}>
              <DetailsOverview
                stockOverview={stockOverview}
                stockDetails={stockDetails}
              />
              <StockChart
                series={stockPerformance}
                setPerformanceAll={setPerformanceAll}
                axisColor={theme.palette.secondary.contrastText}
                buttonBackgroundColor={theme.palette.primary.main}
                buttonTextColor={theme.palette.primary.contrastText}
                height={450}
              />
              <KeyFigures />
              <Dividends />
              <BalanceSheetInfo companyReports={companyReports} />
              <Analysts
                recommendations={analystRecommendations}
                overview={stockOverview}
              />
              <Risks />
            </Container>
          </div>
        )}
    </>
  );
};

export default Details;

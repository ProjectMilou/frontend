// Initally based on Portfolio Details, since then heavily modified
import React from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import { LinearProgress, makeStyles, Container } from '@material-ui/core';
import { isAuthenticationError } from '../../../Errors';
import * as API from '../../../analyser/APIClient';
import ErrorMessage from '../../shared/ErrorMessage';
import DetailsHeader from './DetailsHeader';
import DetailsOverview from './DetailsOverview';
import KeyFigures from './KeyFigures';
import Dividends from './Dividends';
import NewsComponent from './NewsComponent';
import SectionDivider from '../../shared/SectionDivider';
import Risks from './Risks';
import BalanceSheetInfo from './BalanceSheetInfo';
import Analysts from './Analysts';
import AddToPortfolioButton from '../../shared/AddToPortfolioButton';
import DetailsOverviewInfoBox from './DetailsOverviewInfoBox';
import DetailsStockChart from './DetailsStockChart';

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
  const [stockDividend, setStockDividend] = React.useState<number[]>([]);
  const [
    // eslint-disable-next-line
    companyReports,
    setCompanyReports,
  ] = React.useState<API.CompanyReports>();
  const [
    // eslint-disable-next-line
    cashFlowList,
    setCashFlowList,
  ] = React.useState<API.CashFlowList>();
  const [
    // eslint-disable-next-line
    keyFiguresEPS,
    setKeyFiguresEPS,
  ] = React.useState<API.KeyFiguresEPS>();

  // eslint-disable-next-line
  const [analystRecommendations, setAnalystRecommendations] = React.useState<
    API.AnalystsRecommendation[]
  >([]);

  const [performanceAll, setPerformanceAll] = React.useState(false);
  const [
    interestCoverages,
    setInterestCoverages,
  ] = React.useState<API.InterestCoverageList>();
  const [risks, setRisks] = React.useState<API.RiskList>();

  const [error, setError] = React.useState<Error | undefined>();

  // get symbol
  const { id } = useParams();
  const symbol: string = id;

  const isMounted = React.useRef(true);

  const convertPerformance = (performance: API.StockHistricPerformanceList) => {
    const unixDataPoints: number[][] = [];
    performance.dataPoints.forEach((p) => {
      const point: number[] = [Date.parse(p.date), parseFloat(p.close)];
      unixDataPoints.push(point);
    });
    return unixDataPoints.reverse();
  };
  const convertDividend = (dividend: API.StockHistricDividendList) => {
    const unixDataPoints: number[] = [];
    dividend.dataPoints.forEach((p) => {
      const d = Math.round(p.div * 100) / 100;
      const point: number = d;
      unixDataPoints.push(point);
    });
    return unixDataPoints.reverse();
  };
  const [newsList, setNewsList] = React.useState<API.News[]>();

  const fetch = async () => {
    setError(undefined);
    try {
      const sO = await API.stockOverview(token, symbol);
      const sD = await API.stockDetails(token, symbol);
      const sP = await API.stockPerformance(token, symbol, false);
      const sDiv = await API.stockDividend(token, symbol, false);
      const cR = await API.companyReports(token, symbol);
      const cCash = await API.cashFlowList(token, symbol);
      const aR = await API.analystsRecommendations(token, symbol);
      const kF = await API.keyFiguresEPS(token, symbol);
      const iC = await API.interestCoverages(token, symbol);
      const r = await API.risks(token, symbol);

      if (isMounted.current) {
        setStockOverview(sO);
        setStockDetails(sD);
        // TODO get unix timestamp from backend and reverse array
        setStockPerformance(convertPerformance(sP));
        setStockDividend(convertDividend(sDiv));
        setCompanyReports(cR);
        setInterestCoverages(iC);
        setRisks(r);
        setCashFlowList(cCash);
        setKeyFiguresEPS(kF);
        setNewsList([
          {
            headline: 'this is hot news, gamestonk is very high this week',
            url: 'wallstreet.com',
            date: '1st April',
          },
          {
            headline: 'Elon Musk now officially called Master of Coin',
            url: 'news.com',
            date: '12 April',
          },
          {
            headline: 'Elon Musk now officially called Master of Coin',
            url: 'news.com',
            date: '12 April',
          },
          {
            headline: 'Elon Musk now officially called Master of Coin',
            url: 'news.com',
            date: '12 April',
          },
          {
            headline: 'Elon Musk now officially called Master of Coin',
            url: 'news.com',
            date: '12 April',
          },
          {
            headline: 'Elon Musk now officially called Master of Coin',
            url: 'news.com',
            date: '12 April',
          },
        ]);
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
        newsList &&
        companyReports &&
        analystRecommendations &&
        interestCoverages &&
        risks &&
        keyFiguresEPS &&
        cashFlowList && (
          <div>
            <DetailsHeader back={back} stock={stockOverview} />
            <Container className={classes.mainContent}>
              <DetailsOverview
                stockOverview={stockOverview}
                stockDetails={stockDetails}
              />
              <DetailsStockChart
                stockPerformance={stockPerformance}
                setPerformanceAll={setPerformanceAll}
              />
              <DetailsOverviewInfoBox
                stockOverview={stockOverview}
                stockDetails={stockDetails}
              />
              <NewsComponent newsList={newsList} />
              <SectionDivider section="analyser.details.KeyFiguresHeader" />
              <KeyFigures />
              <Dividends series={stockDividend} cashFlowList={cashFlowList} />
              <BalanceSheetInfo companyReports={companyReports} />
              <Analysts
                recommendations={analystRecommendations}
                overview={stockOverview}
              />
              <Risks
                stockOverview={stockOverview}
                stockDetails={stockDetails}
                companyReports={companyReports}
                interestCoverages={interestCoverages}
                risks={risks}
              />
              <AddToPortfolioButton symbol={symbol} />
            </Container>
          </div>
        )}
    </>
  );
};

export default Details;

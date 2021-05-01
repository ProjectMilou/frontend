// Initally based on Portfolio Details, since then heavily modified
import React from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import { LinearProgress, makeStyles, Container } from '@material-ui/core';
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
  const classes = useStyles();

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
    keyFigures,
    setKeyFigures,
  ] = React.useState<API.KeyFigures>();

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

  // get symbol from current route
  const { id } = useParams();
  const symbol: string = id;

  const [currentlyFetching, setCurrentlyFetching] = React.useState<boolean>(
    true
  );

  // Fix for API Cliet Date to Unix Timestamp
  const convertPerformance = (performance: API.StockHistricPerformanceList) => {
    const unixDataPoints: number[][] = [];
    performance.dataPoints.forEach((p) => {
      const point: number[] = [Date.parse(p.date), parseFloat(p.close)];
      unixDataPoints.push(point);
    });
    return unixDataPoints.reverse();
  };

  // Fix for API Cliet Date to Unix Timestamp
  const convertDividend = (dividend: API.StockHistricDividendList) => {
    const unixDataPoints: number[] = [];
    dividend.dataPoints.forEach((p) => {
      const d = Math.round(p.div * 100) / 100;
      const point: number = d;
      unixDataPoints.push(point);
    });
    return unixDataPoints.reverse();
  };
  const [newsList, setNewsList] = React.useState<API.NewsList>();

  const fetch = async () => {
    setError(undefined);
    try {
      const sO = await API.stockOverview(token, symbol);
      const sD = await API.stockDetails(token, symbol);
      const sP = await API.stockPerformance(token, symbol, false);
      const sDiv = await API.stockDividend(token, symbol, false);
      const cR = await API.companyReports(token, symbol);
      const iC = await API.interestCoverages(token, symbol);
      const cCash = await API.cashFlowList(token, symbol);
      const kF = await API.keyFigures(token, symbol);
      const aR = await API.analystsRecommendations(token, symbol);
      const nL = await API.newsList(token, symbol);
      const r = await API.risks(token, symbol);

      setStockOverview(sO);
      setStockDetails(sD);
      // TODO get unix timestamp from backend and reverse array
      setStockPerformance(convertPerformance(sP));
      setStockDividend(convertDividend(sDiv));
      setCompanyReports(cR);
      setInterestCoverages(iC);
      setCashFlowList(cCash);
      setKeyFigures(kF);
      setNewsList(nL);
      setAnalystRecommendations(aR);
      setRisks(r);
    } catch (e) {
      setError(e);
    }
    setCurrentlyFetching(false);
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
    setCurrentlyFetching(true);
    fetch();
    // called on mount and on symbol update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

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
            retry={fetch}
          />
        </Container>
      )}
      <div>
        <DetailsHeader back={back} stock={stockOverview} />
        {currentlyFetching && <LinearProgress color="secondary" />}
        {
          // TODO replace by variable that keeps track
          stockOverview &&
            stockDetails &&
            newsList &&
            companyReports &&
            analystRecommendations &&
            interestCoverages &&
            risks &&
            keyFigures &&
            newsList &&
            cashFlowList && (
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
                <KeyFigures keyFigures={keyFigures} />
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
                />
                <AddToPortfolioButton symbol={symbol} />
              </Container>
            )
        }
      </div>
    </>
  );
};

export default Details;

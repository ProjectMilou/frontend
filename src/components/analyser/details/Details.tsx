// Initially based on Portfolio Details, since then heavily modified
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
interface DetailsProps extends RouteComponentProps {
  // function to return to the dashboard
  back: () => void;
}

const useStyles = makeStyles({
  mainContent: {
    margin: '25px auto',
  },
});

/**
 * This component is a wrapper for all other components in the analyser page of a single stock.
 * It stores all data received from the backend using states.
 *
 * @param back Function that is used to navigate back to analyser page
 */
const Details: React.FC<DetailsProps> = ({ back }) => {
  const classes = useStyles();

  // get symbol from current route
  const { id } = useParams();
  const symbol: string = id;

  const [stockOverview, setStockOverview] = React.useState<API.Stock>();
  const [stockDetails, setStockDetails] = React.useState<API.StockDetails>();
  const [keyFigures, setKeyFigures] = React.useState<API.KeyFigures>();
  const [risks, setRisks] = React.useState<API.RiskList>();
  const [newsList, setNewsList] = React.useState<API.NewsList>();
  const [stockDividend, setStockDividend] = React.useState<number[]>([]);
  const [divQuota, setDivQuota] = React.useState<number>(0);
  const [divNextPayout, setDivNextPayout] = React.useState<Date>();
  const [performanceAll, setPerformanceAll] = React.useState(false);
  const [stockPerformance, setStockPerformance] = React.useState<number[][]>([
    [],
  ]);

  const [
    companyReports,
    setCompanyReports,
  ] = React.useState<API.CompanyReports>();
  const [cashFlowList, setCashFlowList] = React.useState<API.CashFlowList>();

  const [analystRecommendations, setAnalystRecommendations] = React.useState<
    API.AnalystsRecommendation[]
  >([]);

  const [
    interestCoverages,
    setInterestCoverages,
  ] = React.useState<API.InterestCoverageList>();

  const [error, setError] = React.useState<Error | undefined>();
  const [currentlyFetching, setCurrentlyFetching] = React.useState<boolean>(
    true
  );

  /**  Fix for API Client to convert Date to Unix Timestamp */
  const convertPerformance = (
    performance: API.StockHistoricPerformanceList
  ) => {
    const unixDataPoints: number[][] = [];
    performance.dataPoints.forEach((p) => {
      const point: number[] = [Date.parse(p.date), parseFloat(p.close)];
      unixDataPoints.push(point);
    });
    return unixDataPoints.reverse();
  };

  /**  Fix for API Client to convert Dividend Date to Unix Timestamp */
  const convertDividend = (dividend: API.StockHistoricDividendList) => {
    const dividendDataPoints: number[] = [];
    dividend.dataPoints.forEach((p) => {
      const d = Math.round(p.div * 100) / 100;
      const point: number = d;
      dividendDataPoints.push(point);
    });
    return dividendDataPoints.reverse();
  };

  /** Method that is used to fetch all data from backend for each component. Saves results in corresponding states */
  const fetch = async () => {
    setError(undefined);
    try {
      const sO = await API.stockOverview(symbol);
      const sD = await API.stockDetails(symbol);
      const sP = await API.stockPerformance(symbol, false);
      const sDiv = await API.stockDividend(symbol, false);
      const cR = await API.companyReports(symbol);
      const iC = await API.interestCoverages(symbol);
      const cCash = await API.cashFlowList(symbol);
      const kF = await API.keyFigures(symbol);
      const aR = await API.analystsRecommendations(symbol);
      const nL = await API.newsList(symbol);
      const r = await API.risks(symbol);

      setStockOverview(sO);
      setStockDetails(sD);
      setStockPerformance(convertPerformance(sP));
      setStockDividend(convertDividend(sDiv));
      setDivQuota(parseFloat(sDiv.quota));
      setDivNextPayout(new Date(sDiv.date))
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

  /** method that is used if more than 5 years of performance is requested */
  const fetchAllPerformanceData = async () => {
    try {
      const sP = await API.stockPerformance(symbol, true);
      setStockPerformance(convertPerformance(sP));
      setPerformanceAll(true);
    } catch (e) {
      setError(e);
    }
  };

  React.useEffect(() => {
    if (performanceAll) {
      fetchAllPerformanceData();
    }
    // called on mount and on performance update.
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
      <>
        <DetailsHeader back={back} stock={stockOverview} />
        {currentlyFetching && <LinearProgress color="secondary" />}
        {stockOverview &&
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
              <Dividends
                series={stockDividend}
                cashFlowList={cashFlowList}
                dividendPayoutRatio={divQuota}
                dividendYield= {stockOverview.div}
                nextPayout={divNextPayout}
              />
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
          )}
      </>
    </>
  );
};

export default Details;

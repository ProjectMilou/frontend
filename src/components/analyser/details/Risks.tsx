import React from 'react';
import * as API from '../../../analyser/APIClient';
import Volatility from './Volatility';
import Leverage from './Leverage';
import SectionDivider from '../../shared/SectionDivider';

// props type declaration
export type DetailsProps = {
  stockOverview: API.Stock;
  stockDetails: API.StockDetails;
  companyReports: API.CompanyReports;
  interestCoverages: API.InterestCoverageList;
  risks: API.RiskList;
};

const Risks: React.FC<DetailsProps> = ({
  stockOverview,
  stockDetails,
  companyReports,
  interestCoverages,
  risks,
}) => (
  <div>
    <SectionDivider section="analyser.details.RiskHeader" />
    <Volatility details={stockDetails} risks={risks} />
    <Leverage
      stockOverview={stockOverview}
      companyReports={companyReports}
      interestCoverages={interestCoverages}
    />
  </div>
);
export default Risks;

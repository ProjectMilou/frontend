import React from 'react';
import DetailsMainAnalyticsCorrelations from './DetailsMainAnalyticsCorrelations';
import { NonEmptyPortfolioDetails } from '../../portfolio/APIClient';

type DetailsMainAnalyticsProps = {
  portfolio: NonEmptyPortfolioDetails;
};

const DetailsMainAnalytics: React.FC<DetailsMainAnalyticsProps> = ({
  portfolio,
}) => <DetailsMainAnalyticsCorrelations portfolio={portfolio} />;

export default DetailsMainAnalytics;

import React from 'react';
import { Position, RiskAnalysis } from '../../portfolio/APIClient';

type DetailsMainRiskProps = {
  risk: RiskAnalysis;
  positions: Position[];
};

// returns the details page header
const DetailsMainRisk: React.FC<DetailsMainRiskProps> = () => <p>test</p>;

export default DetailsMainRisk;

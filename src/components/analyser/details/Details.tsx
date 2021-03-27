import React from 'react';
import KeyFigures from './KeyFigures';
import KeyFiguresBar from './KeyFiguresBar';
import SectionCard from './SectionCard';

// props type declaration
export type DetailsProps = {
  // function to return to the dashboard
  back: () => void;
  symbol: string;
};

const Details: React.FC<DetailsProps> = ({ symbol }) => (
  <div>
    details will be here
    <p>{symbol}</p>
    <KeyFigures/>
  </div>
);

export default Details;

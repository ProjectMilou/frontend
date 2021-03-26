import React from 'react';

// props type declaration
export type DetailsProps = {
  // function to return to the dashboard
  back: () => void;
  symbol: string;
};

const Details: React.FC<DetailsProps> = ({symbol}) => (
  <div>
    details will be here
    <p>{symbol}</p>
  </div>
);

export default Details;

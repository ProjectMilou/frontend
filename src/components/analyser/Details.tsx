import React from 'react';

// props type declaration
export type DetailsProps = {
  // function to return to the dashboard
  back: () => void;
};

const Details: React.FC<DetailsProps> = () => (
  <div>
    details will be here
  </div>
);

export default Details;

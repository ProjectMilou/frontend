import { Button } from '@material-ui/core';
import React from 'react';
import Details from './Details';

// temporary title that gets passed to the details page
const title = 'My Portfolio';

const Portfolio: React.FC = () => {
  const [id, setId] = React.useState<string>();

  return (
    <div>
      <Button onClick={() => setId('2')}> </Button>
      {id ? <Details back={() => setId(undefined)} /> : <Button />}
    </div>
  );
};

export default Portfolio;

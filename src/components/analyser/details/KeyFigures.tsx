import React from 'react';
import KeyFiguresBar from '../../shared/KeyFiguresBar';
import SubsectionDivider from '../../shared/SubsectionDivider';
import * as API from '../../../analyser/APIClient';

export type KeyFigureProps = {
  keyFigures: API.KeyFigures
};

const KeyFigures: React.FC<KeyFigureProps> = ({ keyFigures} ) => {
  // portfolio team moved this mock value up from the chart
  // change this to the real api data whenever you need

  const years = keyFigures.success.map((f) => new Date(f.date).getFullYear())
  

  const mockSeries = {
    PER: [30, 40, 45, 50, 50],
    PBR: [50, 25, 35, 80, 20],
    PEGR: [30, 50, 15, 40, 10],
    EPS: [10, 20, 25, 10, 90],
  };

  return (
    <div>
      <SubsectionDivider subsection="analyser.details.KeyFiguresHeader.KeyFigures" />
      <KeyFiguresBar
        chartHeight={350}
        keyFigures={mockSeries}
        // TODO: change to real years
        years={years}
      />
    </div>
  );
};
export default KeyFigures;

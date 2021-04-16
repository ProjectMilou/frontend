import React from 'react';
import KeyFiguresBar from '../../shared/KeyFiguresBar';
import SubsectionDivider from '../../shared/SubsectionDivider';

export type KeyFigure = {
  title: string;
  definition: string;
  // value?: number;
};

const KeyFigures: React.FC = () => {
  // portfolio team moved this mock value up from the chart
  // change this to the real api data whenever you need
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
        years={[2016, 2017, 2018, 2019, 2020]}
      />
    </div>
  );
};
export default KeyFigures;

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
    PER: keyFigures.success.map((f) => f.PERatio),
    PBR: keyFigures.success.map((f) => f.PBRatio),
    PEGR: keyFigures.success.map((f) => f.PEGrowthRatio),
    EPS: keyFigures.success.map((f) => parseFloat(f.EPS)),
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

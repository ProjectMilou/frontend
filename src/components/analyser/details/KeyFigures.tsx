import React from 'react';
import KeyFiguresBar from '../../shared/KeyFiguresBar';
import SubsectionDivider from '../../shared/SubsectionDivider';
import * as API from '../../../analyser/APIClient';

export type KeyFigureProps = {
  keyFigures: API.KeyFigures;
};

const KeyFigures: React.FC<KeyFigureProps> = ({ keyFigures }) => {
  const years = keyFigures.success.map((f) => new Date(f.date).getFullYear());

  const series = {
    PER: keyFigures.success.map((f) => Math.round(f.PERatio * 100) / 100),
    PBR: keyFigures.success.map((f) => Math.round(f.PBRatio * 100) / 100),
    PEGR: keyFigures.success.map(
      (f) => Math.round(f.PEGrowthRatio * 100) / 100
    ),
    EPS: keyFigures.success.map((f) => Math.round(parseFloat(f.EPS))),
  };

  return (
    <div>
      <SubsectionDivider subsection="analyser.details.KeyFiguresHeader.KeyFigures" />
      <KeyFiguresBar chartHeight={350} keyFigures={series} years={years} />
    </div>
  );
};
export default KeyFigures;

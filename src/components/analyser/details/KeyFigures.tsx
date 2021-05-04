import React from 'react';
import KeyFiguresBar from '../../shared/KeyFiguresBar';
import SubsectionDivider from '../../shared/SubsectionDivider';
import * as API from '../../../analyser/APIClient';

// KeyFigure props type declaration
export type KeyFigureProps = {
  keyFigures: API.KeyFigures;
};

/**
 * This components contains the key figures section on detail page
 * @param keyFigures - Data about key figures (P/E, P/B, PEGR, EPS)
 *
 */
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
    <>
      <SubsectionDivider subsection="analyser.details.KeyFiguresHeader.KeyFigures" />
      <KeyFiguresBar
        chartHeight={350}
        keyFigures={series}
        years={years}
        outlined
      />
    </>
  );
};
export default KeyFigures;

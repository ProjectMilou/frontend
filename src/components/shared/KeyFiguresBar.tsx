import React from 'react';
import { Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { KeyFigure, KeyFigureSelect } from './KeyFigureSelect';
import KeyFiguresChart from './KeyFiguresChart';

type KeyFiguresBarProps = {
  keyFigures: { [keyFigure in KeyFigure]: number[] };
  years: number[];
  textColor: string;
  chartHeight: number;
};

const KeyFiguresBar: React.FC<KeyFiguresBarProps> = ({
  keyFigures,
  years,
  textColor,
  chartHeight,
}) => {
  const { t } = useTranslation();

  const [selectedSeries, setSelectedSeries] = React.useState<KeyFigure>('PER');

  return (
    <div>
      <Toolbar>
        {Object.keys(keyFigures).map((keyFigure) => (
          <KeyFigureSelect
            key={keyFigure}
            keyFigure={keyFigure as KeyFigure}
            selected={selectedSeries === keyFigure}
            select={setSelectedSeries}
            textColor={textColor}
          />
        ))}
      </Toolbar>
      <KeyFiguresChart
        height={chartHeight}
        series={{
          name: t(`analyser.detail.keyfigure.${selectedSeries}.title`),
          data: keyFigures[selectedSeries],
        }}
        years={years}
        textColor={textColor}
      />
    </div>
  );
};
export default KeyFiguresBar;

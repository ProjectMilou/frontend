import React from 'react';
import { Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OneKeyFigure } from './OneKeyFigure';
<<<<<<< HEAD:src/components/analyser/details/KeyFiguresBar.tsx
import KeyFiguresChart from '../../charts/KeyFiguresChart';
=======
import KeyFiguresChart, { Series } from './KeyFiguresChart';
>>>>>>> analyser:src/components/shared/KeyFiguresBar.tsx

type KeyFiguresBarProps = {
  series: Series[];
  textColor: string;
  chartHeight: number;
};

const KeyFiguresBar: React.FC<KeyFiguresBarProps> = ({
  series,
  textColor,
  chartHeight,
}) => {
  const { t } = useTranslation();

  // filters
  const [filteredNames, setFilteredNames] = React.useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    // remove from filter
    if (filteredNames.includes(filter))
      setFilteredNames(filteredNames.filter((names) => names !== filter));
    // add to filter
    if (!filteredNames.includes(filter))
      setFilteredNames([...filteredNames, filter]);
  };

  return (
    <div>
      <Toolbar>
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PER.title')}
          definition={t('analyser.detail.keyfigure.PER.definition')}
          toggleFilter={toggleFilter}
          textColor={textColor}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PBR.title')}
          definition={t('analyser.detail.keyfigure.PER.definition')}
          toggleFilter={toggleFilter}
          textColor={textColor}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PEGR.title')}
          definition={t('analyser.detail.keyfigure.PEGR.definition')}
          toggleFilter={toggleFilter}
          textColor={textColor}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.EPS.title')}
          definition={t('analyser.detail.keyfigure.EPS.definition')}
          toggleFilter={toggleFilter}
          textColor={textColor}
        />
      </Toolbar>
      <KeyFiguresChart
        height={chartHeight}
        series={series.filter((s) => !filteredNames.includes(s.name))}
        textColor={textColor}
      />
    </div>
  );
};
export default KeyFiguresBar;

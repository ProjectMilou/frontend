import React from 'react';
import { Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OneKeyFigure } from './OneKeyFigure';
import KeyFiguresChart from './KeyFiguresChart';

const KeyFiguresBar: React.FC = () => {
  const { t } = useTranslation();

  // TODO fetch data from backend
  // eslint-disable-next-line
  const [seriesArray, setSeriesArray] = React.useState([
    {
      name: t('analyser.detail.keyfigure.PER.title'),
      data: [30, 40, 45, 50, 50],
    },
    {
      name: t('analyser.detail.keyfigure.PBR.title'),
      data: [50, 25, 35, 80, 20],
    },
    {
      name: t('analyser.detail.keyfigure.PEGR.title'),
      data: [30, 50, 15, 40, 10],
    },
    {
      name: t('analyser.detail.keyfigure.EPS.title'),
      data: [10, 20, 25, 10, 90],
    },
  ]);

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
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PBR.title')}
          definition={t('analyser.detail.keyfigure.PER.definition')}
          toggleFilter={toggleFilter}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PEGR.title')}
          definition={t('analyser.detail.keyfigure.PEGR.definition')}
          toggleFilter={toggleFilter}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.EPS.title')}
          definition={t('analyser.detail.keyfigure.EPS.definition')}
          toggleFilter={toggleFilter}
        />
      </Toolbar>
      <KeyFiguresChart
        series={seriesArray.filter(
          (series) => !filteredNames.includes(series.name)
        )}
      />
    </div>
  );
};
export default KeyFiguresBar;

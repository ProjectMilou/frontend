import React from 'react';
import { Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OneKeyFigure } from './OneKeyFigure';
import KeyFiguresChart from './KeyFiguresChart';

const KeyFiguresBar: React.FC = () => {
  const { t } = useTranslation();

  const [seriesArray, setSeriesArray] = React.useState([
    {
      name: 'PE',
      data: [30, 40, 45, 50, 50],
    },
    {
      name: 'PB',
      data: [50, 25, 35, 80, 20],
    },
    {
      name: 'PEG',
      data: [30, 50, 15, 40, 10],
    },
    {
      name: 'ES',
      data: [10, 20, 25, 10, 90],
    },
  ]);

  return (
    <div>
      <Toolbar>
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PER.title')}
          definition={t('analyser.detail.keyfigure.PER.definition')}
          setSeries={setSeriesArray}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PBR.title')}
          definition={t('analyser.detail.keyfigure.PBR.definition')}
          setSeries={setSeriesArray}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PEGR.title')}
          definition={t('analyser.detail.keyfigure.PEGR.definition')}
          setSeries={setSeriesArray}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.EPS.title')}
          definition={t('analyser.detail.keyfigure.EPS.definition')}
          setSeries={setSeriesArray}
        />
      </Toolbar>
      <KeyFiguresChart series={seriesArray} />
    </div>
  );
};
export default KeyFiguresBar;

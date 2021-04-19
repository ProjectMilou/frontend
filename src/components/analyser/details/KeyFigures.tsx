import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import KeyFiguresBar from '../../shared/KeyFiguresBar';
import SubsectionDivider from '../../shared/SubsectionDivider';

export type KeyFigure = {
  title: string;
  definition: string;
  // value?: number;
};

const KeyFigures: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // portfolio team moved this mock value up from the chart
  // change this to the real api data whenever you need
  const mockSeries = [
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
  ];

  return (
    <div>
      <SubsectionDivider subsection="analyser.details.KeyFiguresHeader.KeyFigures" />
      <KeyFiguresBar
        chartHeight={350}
        series={mockSeries}
        textColor={theme.palette.secondary.contrastText}
      />
    </div>
  );
};
export default KeyFigures;

import React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { KeyFigures } from './DetailsTypes';
// TODO put into shared folder instead of importing from analyzer
import KeyFiguresBar from '../analyser/details/KeyFiguresBar';

// stylesheet for the key figure section
const useStyles = makeStyles(() =>
  createStyles({
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    figureWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
  })
);

// type declarations
type DetailsMainKeyFiguresProps = {
  figures: KeyFigures[];
};

// returns the details page header
const DetailsMainKeyFigures: React.FC<DetailsMainKeyFiguresProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

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
    <div className={classes.figureWrapper}>
      <KeyFiguresBar
        chartHeight={350}
        series={mockSeries}
        textColor={theme.palette.primary.contrastText}
      />
    </div>
  );
};

export default DetailsMainKeyFigures;

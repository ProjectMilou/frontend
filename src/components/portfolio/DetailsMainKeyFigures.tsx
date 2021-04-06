import React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import KeyFiguresBar from '../shared/KeyFiguresBar';
import { KeyFigures } from '../../portfolio/APIClient';

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
const DetailsMainKeyFigures: React.FC<DetailsMainKeyFiguresProps> = ({
  figures,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const series = [
    {
      name: t('analyser.detail.keyfigure.PER.title'),
      data: figures.map((f) => f.pte),
    },
    {
      name: t('analyser.detail.keyfigure.PBR.title'),
      data: figures.map((f) => f.ptb),
    },
    {
      name: t('analyser.detail.keyfigure.PEGR.title'),
      data: figures.map((f) => f.ptg),
    },
    {
      name: t('analyser.detail.keyfigure.EPS.title'),
      data: figures.map((f) => f.eps),
    },
  ];

  return (
    <div className={classes.figureWrapper}>
      <KeyFiguresBar
        chartHeight={350}
        series={series}
        textColor={theme.palette.primary.contrastText}
      />
    </div>
  );
};

export default DetailsMainKeyFigures;

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import KeyFiguresBar from '../shared/KeyFiguresBar';
import { KeyFigures } from '../../portfolio/APIClient';

// stylesheet for the key figure section
const useStyles = makeStyles(({ palette }: Theme) =>
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
    placeholderInfo: {
      display: 'flex',
      margin: '15rem 0',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.contrastText,
      fontSize: '1.15rem',
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
  const { t } = useTranslation();

  const keyFigures = {
    PER: figures.map((f) => f.pte),
    PBR: figures.map((f) => f.ptb),
    PEGR: figures.map((f) => f.ptg),
    EPS: figures.map((f) => f.eps),
  };

  if (figures.length === 0) {
    return (
      <div className={classes.placeholderInfo}>
        {t('portfolio.details.emptyKeyFigures')}
      </div>
    );
  }

  return (
    <div className={classes.figureWrapper}>
      <KeyFiguresBar
        chartHeight={350}
        keyFigures={keyFigures}
        years={figures.map((f) => f.year)}
        dark
      />
    </div>
  );
};

export default DetailsMainKeyFigures;

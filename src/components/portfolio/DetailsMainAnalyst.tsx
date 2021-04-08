import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AnalystBar from '../shared/AnalystBar';
import AnalystBarIndicator from '../shared/AnalystBarIndicator';
import { Position } from '../../portfolio/APIClient';

// stylesheet for the analyst section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    analystWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    description: {
      color: palette.primary.contrastText,
      textAlign: 'center',
    },
  })
);

type DetailsMainAnalystProps = {
  positions: Position[];
};

const DetailsMainAnalyst: React.FC<DetailsMainAnalystProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  // TODO: use actual values
  const mock = [
    { name: 'bmw', score: 0.2 },
    { name: 'mercedes', score: 0.4 },
    { name: 'qqq', score: 0.9 },
    { name: 't0', score: 0.6 },
    { name: 't1', score: 0.6 },
    { name: 't2', score: 0.8 },
  ];

  return (
    <div className={classes.analystWrapper}>
      <p className={classes.description}>
        {t('portfolio.details.analystSubtext')}
      </p>
      <AnalystBar>
        {/* TODO deal with overlap */}
        {mock.map((m) => (
          <AnalystBarIndicator
            key={m.score}
            tooltipText={`${m.name}: ${m.score * 100}`}
            score={m.score}
            color={theme.palette.primary.contrastText}
          />
        ))}
      </AnalystBar>
    </div>
  );
};

export default DetailsMainAnalyst;

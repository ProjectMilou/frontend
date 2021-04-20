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
import { collectStocks, CollectedStocks } from '../../portfolio/Helper';

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
      fontSize: '1.15rem',
    },
  })
);

type DetailsMainAnalystProps = {
  positions: Position[];
};

const DetailsMainAnalyst: React.FC<DetailsMainAnalystProps> = ({
  positions,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const barData: CollectedStocks = collectStocks(positions, false);

  return (
    <div className={classes.analystWrapper}>
      <p className={classes.description}>
        {t('portfolio.details.analystSubtext')}
      </p>
      <AnalystBar>
        {Object.entries(barData).map(([score, names]) => (
          <AnalystBarIndicator
            key={score}
            tooltipText={names}
            score={parseInt(score, 10)}
            color={theme.palette.primary.contrastText}
          />
        ))}
      </AnalystBar>
    </div>
  );
};

export default DetailsMainAnalyst;

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
      fontSize: '1.15rem',
    },
  })
);

type BarDataType = {
  [key: number]: string;
};

type DetailsMainAnalystProps = {
  positions: Position[];
};

const DetailsMainAnalyst: React.FC<DetailsMainAnalystProps> = ({
  positions,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  // an object that keeps only the data that is needed to display the analyst bar
  const barData: BarDataType = {};

  // please keep in mind while adding to this section that this calculation happens every re-render
  if (positions) {
    Object.values(positions)
      // sort by total value
      .sort((a, b) => (a.qty * a.stock.price > b.qty * b.stock.price ? 1 : -1))
      // take the top 5
      .slice(positions.length > 5 ? positions.length - 5 : 0)
      .forEach((p) => {
        const score = Math.round(p.stock.score * 100);

        if (!barData[score]) {
          // if there is no entry with this score create one
          barData[score] = p.stock.name;
        } else {
          // otherwise add on to an existing score
          barData[score] = barData[score].concat(`\n${p.stock.name}`);
        }
      });
  }

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

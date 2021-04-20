import React from 'react';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AnalystBar from '../../shared/AnalystBar';
import AnalystBarIndicator from '../../shared/AnalystBarIndicator';
import StyledNumberFormat from '../../shared/StyledNumberFormat';
import * as API from '../../../analyser/APIClient';
import InfoButton from '../../shared/InfoButton';

export type AnalystsProps = {
  recommendations: API.AnalystsRecommendation[];
  overview: API.Stock;
};

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionSubTitle: {
      margin: 0,
      color: palette.primary.main,
      fontSize: '2rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    boxTitles: {
      margin: 0,
      color: palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    redDot: {
      height: '25px',
      width: '25px',
      backgroundColor: '#cc0000',
      borderRadius: '50%',
      display: 'inline-block',
    },
    yellowDot: {
      height: '25px',
      width: '25px',
      backgroundColor: '#d99600',
      borderRadius: '50%',
      display: 'inline-block',
    },
    greenDot: {
      height: '25px',
      width: '25px',
      backgroundColor: '#00ba09',
      borderRadius: '50%',
      display: 'inline-block',
    },
  })
);

// Calculates percentage buy/sell/hold
// multiplied by 1 to prevent issue with string concatenation
function getPercentage(val: API.AnalystsRecommendation[]): number {
  let percentage = 0;
  if (val.length > 0) {
    percentage =
      (val[0].buy * 100 + val[0].hold * 50 + val[0].sell * 0) /
      (val[0].buy * 1 + val[0].hold * 1 + val[0].sell * 1);
  }
  return percentage;
}

function getDescription(val: number): string {
  let description = 'Buy';
  if (val <= 33) {
    description = 'Sell';
  } else if (val <= 66) {
    description = 'Hold';
  }
  return description;
}

const Analysts: React.FC<AnalystsProps> = ({ recommendations, overview }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <p>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.analystsHeader')}
          </h2>
        </div>
      </div>
      <div className={classes.titleWrapper}>
        <h5 className={classes.boxTitles}>
          {t('analyser.details.analysts.target')}
          <>&nbsp;</>
          <StyledNumberFormat
            value={parseFloat(overview.analystTargetPrice)}
            suffix="€"
          />
          <>&nbsp;&nbsp;</>
          <InfoButton
            infotext={t('analyser.details.analysts.target.infoButton')}
          />
        </h5>
      </div>
      <AnalystBar>
        <AnalystBarIndicator
          tooltipText={getDescription(getPercentage(recommendations))}
          score={getPercentage(recommendations)}
          color={theme.palette.primary.main}
        />
      </AnalystBar>
      <div className={classes.titleWrapper}>
        <h5 className={classes.boxTitles}>
          Sell:
          <>&nbsp;&nbsp;</>
          <span className={classes.redDot} />
          <>&emsp;&emsp;&emsp;</>
          Hold:
          <>&nbsp;&nbsp;</>
          <span className={classes.yellowDot} />
          <>&emsp;&emsp;&emsp;</>
          Buy:
          <>&nbsp;&nbsp;</>
          <span className={classes.greenDot} />
        </h5>
      </div>
    </p>
  );
};

export default Analysts;

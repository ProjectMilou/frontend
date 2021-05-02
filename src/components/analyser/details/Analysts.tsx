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
import { getPercentage, getDescription } from '../../../analyser/Helper';

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
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
      display: 'flex',
    },
    redDot: {
      height: '25px',
      width: '25px',
      backgroundColor: '#cc0000', // palette.error is not the correct color
      borderRadius: '50%',
      display: 'inline-block',
    },
    yellowDot: {
      height: '25px',
      width: '25px',
      backgroundColor: '#d99600', // palette.warning is not the correct color
      borderRadius: '50%',
      display: 'inline-block',
    },
    greenDot: {
      height: '25px',
      width: '25px',
      backgroundColor: '#00ba09', // palette.teal/success is not the correct color
      borderRadius: '50%',
      display: 'inline-block',
    },
  })
);

/**
 * This component gives an overview about the analysts recommendations to buy, sell or hold a stock
 * 
 * @param recommendations list of recommendations to buy sell or stock
 * @param overview stock overview object to get analyst target price from
 * 
 */
const Analysts: React.FC<AnalystsProps> = ({ recommendations, overview }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
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
          <StyledNumberFormat value={overview.analystTargetPrice} suffix="€" />
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
          {t('stock.sell')}: 
          <>&nbsp;&nbsp;</>
          <span className={classes.redDot} />
          <>&emsp;&emsp;&emsp;</>
          {t('stock.hold')}:
          <>&nbsp;&nbsp;</>
          <span className={classes.yellowDot} />
          <>&emsp;&emsp;&emsp;</>
          {t('stock.buy')}:
          <>&nbsp;&nbsp;</>
          <span className={classes.greenDot} />
        </h5>
      </div>
    </>
  );
};

export default Analysts;

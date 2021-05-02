import React from 'react';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AnalystBar from '../../shared/AnalystBar';
import AnalystBarIndicator from '../../shared/AnalystBarIndicator';
import StyledNumberFormat from '../../shared/StyledNumberFormat';
import * as API from '../../../analyser/APIClient';
import InfoButton from '../../shared/InfoButton';
import { getPercentage, getDescription } from '../../../analyser/Helper';
import SubsectionDivider from '../../shared/SubsectionDivider';

export type AnalystsProps = {
  recommendations: API.AnalystsRecommendation[];
  overview: API.Stock;
};

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    rootContainer: {
      marginRight: '1rem',
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
    legend: {
      marginTop: 50,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      <SubsectionDivider subsection={t('analyser.details.analystsHeader')} />

      <Container className={classes.rootContainer}>
        <h5 className={classes.boxTitles}>
          {t('analyser.details.analysts.target')}
          <>&nbsp;</>
          <StyledNumberFormat
            fontWeight={600}
            value={overview.analystTargetPrice}
            suffix="€"
          />
          <>&nbsp;&nbsp;</>
          <InfoButton
            infotext={t('analyser.details.analysts.target.infoButton')}
          />
        </h5>

        <AnalystBar>
          <AnalystBarIndicator
            tooltipText={getDescription(getPercentage(recommendations))}
            score={getPercentage(recommendations)}
            color={theme.palette.primary.main}
          />
        </AnalystBar>
        <Container className={classes.legend}>
          <h5 className={classes.boxTitles}>
            {t('stock.sell')}:<>&nbsp;&nbsp;</>
            <span className={classes.redDot} />
            <>&emsp;&emsp;&emsp;</>
            {t('stock.hold')}:<>&nbsp;&nbsp;</>
            <span className={classes.yellowDot} />
            <>&emsp;&emsp;&emsp;</>
            {t('stock.buy')}:<>&nbsp;&nbsp;</>
            <span className={classes.greenDot} />
          </h5>
        </Container>
      </Container>
    </>
  );
};

export default Analysts;

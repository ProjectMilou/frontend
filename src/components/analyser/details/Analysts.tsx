import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AnalystBar from '../../shared/AnalystBar';
import AnalystBarIndicator from '../../shared/AnalystBarIndicator';
import * as API from '../../../analyser/APIClient';

export type AnalystsProps = {
  recommendations: API.AnalystsRecommendation[];
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
})
);

function getPercentage(val: API.AnalystsRecommendation[]): number {
  let percentage = 0;
  if(val.length>0){
    percentage = (val[0].buy*100+val[0].hold*50+val[0].sell*0)/(val[0].buy*1+val[0].hold*1+val[0].sell*1)
  }
  return percentage
}

const Analysts: React.FC<AnalystsProps> = ({ recommendations }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();

    return(
        <p>
        <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.AnalysisHeader')}
          </h2>
        </div>
      </div>
      <AnalystBar>
      <AnalystBarIndicator tooltipText='Buy' score={getPercentage(recommendations)} color={theme.palette.primary.main}/>
      </AnalystBar>
      </p>
    )
}

export default Analysts;
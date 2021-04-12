import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AnalystBar from '../../shared/AnalystBar';
import AnalystBarIndicator from '../../shared/AnalystBarIndicator';

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

const Analysts: React.FC = () => {
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
      <AnalystBarIndicator tooltipText='Buy' score={75} color={theme.palette.primary.main}/>
      </AnalystBar>
      </p>
    )
}

export default Analysts;
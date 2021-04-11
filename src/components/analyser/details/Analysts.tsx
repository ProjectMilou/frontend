import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
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
        color: 'primary',
        // TODO use theme fontsize and weight
        fontSize: '2rem',
        fontWeight: 400,
        whiteSpace: 'nowrap',
      },
})
);

const Analysts: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return(
        <p>
        <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.AnalysisHeader')}
          </h2>
        </div>
      </div>
      </p>
    )
}

export default Analysts;
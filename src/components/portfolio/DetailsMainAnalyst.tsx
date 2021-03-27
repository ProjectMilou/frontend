import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

// stylesheet for the analyst section
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: palette.primary.contrastText,
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      // TODO: use theme color
      borderColor: '#EEF1FB',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
    riskContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    analystWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // TODO: delete fixed height
      height: '30rem',
    },
  })
);

// type declarations
type DetailsMainAnalystProps = {
  // props
};

// returns the details page header
const DetailsMainAnalyst: React.FC<DetailsMainAnalystProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>
            {t('portfolio.details.analyst')}
          </h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      <div className={classes.analystWrapper}>{/* body */}</div>
    </div>
  );
};

export default DetailsMainAnalyst;

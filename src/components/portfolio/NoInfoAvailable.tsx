import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    placeholderInfo: {
      display: 'flex',
      margin: '15rem 0',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.contrastText,
      fontSize: '1.15rem',
    },
  })
);

/**
 * This component is used to display a string instead of the content for a section in DetailsMain.
 * This is most likely due to missing data from the backend.
 */
const NoInfoAvailable: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.placeholderInfo}>
      {t('portfolio.details.emptyKeyFigures')}
    </div>
  );
};

export default NoInfoAvailable;

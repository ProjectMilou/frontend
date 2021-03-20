import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  header: {
    height: '35vh',
    'background-color': '#0D1B3B',
  },
  text: {
    'font-size': '4vh',
    color: '#EEF1FB',
    'padding-top': '5%',
    'padding-left': '5%',
    'padding-bottom': '5%',
    width: '50%',
  },
});

const DashboardHeader: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.header}>
      <p className={classes.text}>{t('portfolio.dashboard.headerText')}</p>
    </div>
  );
};

export default DashboardHeader;

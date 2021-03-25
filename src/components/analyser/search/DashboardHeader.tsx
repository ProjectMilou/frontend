import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  header: {
    'background-color': '#0D1B3B',
  },
  text: {
    'font-size': '48px',
    color: '#EEF1FB',
    padding: '50px 0',
    minWidth: '50%',
    maxWidth: '1000px',
  },
});

const DashboardHeader: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.header}>
      <Container maxWidth="lg">
        <Typography className={classes.text}>
          {t('analyser.dashboard.headerText')}
        </Typography>
      </Container>
    </div>
  );
};

export default DashboardHeader;

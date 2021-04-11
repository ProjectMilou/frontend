import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import KeyFiguresBar from '../../shared/KeyFiguresBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    customSize: {
      maxWidth: 500,
    },
    root: {
      margin: '25px auto',
      minWidth: '50%',
    },
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    sectionSubTitle: {
      margin: 0,
      color: 'primary',
      // TODO use theme fontsize and weight
      fontSize: '2rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      // TODO: use theme color
      borderColor: 'grey',
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
  })
);

export type KeyFigure = {
  title: string;
  definition: string;
  // value?: number;
};

const KeyFigures: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  // portfolio team moved this mock value up from the chart
  // change this to the real api data whenever you need
  const mockSeries = [
    {
      name: t('analyser.detail.keyfigure.PER.title'),
      data: [30, 40, 45, 50, 50],
    },
    {
      name: t('analyser.detail.keyfigure.PBR.title'),
      data: [50, 25, 35, 80, 20],
    },
    {
      name: t('analyser.detail.keyfigure.PEGR.title'),
      data: [30, 50, 15, 40, 10],
    },
    {
      name: t('analyser.detail.keyfigure.EPS.title'),
      data: [10, 20, 25, 10, 90],
    },
  ];

  return (
    <p>
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>
            {t('analyser.details.KeyFiguresHeader')}
          </h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.KeyFiguresHeader.KeyFigures')}
          </h2>
        </div>
      </div>
      <KeyFiguresBar
        chartHeight={350}
        series={mockSeries}
        textColor={theme.palette.secondary.contrastText}
      />
    </div>
    </p>
  );
};
export default KeyFigures;

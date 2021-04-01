import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DividendRatioDonut from '../../charts/DividendRatioDonut';
import DividendLineChart from '../../charts/DividendLineChart';

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
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    pieChartWrapper: {
      display: 'flex',
      width: '20rem',
      height: '20rem',
      flexBasis: '35%',
    },
    lineChartWrapper: {
      width: '40rem',
      height: '20rem',
      flexBasis: '60%',
    },
  })
);

const Dividends: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  // TODO fetch data from backend
  // eslint-disable-next-line
  const [seriesArray, setSeriesArray] = React.useState([
    {
      name: t('analyser.detail.dividend.payoutratio'),
      type: 'column',
      data: [25.0, 20.35, 18.72, 21.9, 23.11],
    },
    {
      name: t('analyser.detail.dividend.yield'),
      type: 'line',
      data: [0.58, 0.71, 0.8, 1.12, 0.97],
    },
  ]);

  const ratio = 0.25;
  const dividendYield = 0.017;
  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>
            {t('analyser.details.DividendsHeader')}
          </h2>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <div className={classes.lineChartWrapper}>
          <DividendLineChart series={seriesArray} />
        </div>
        <div>
          <body>Dividend Yield</body>
          <h3 className={classes.sectionSubTitle}>
            {(dividendYield * 100).toFixed(2)}%
          </h3>
          <body>Dividend Payout Ratio</body>
          <div className={classes.pieChartWrapper}>
            <DividendRatioDonut ratio={ratio} />
          </div>
          <body>Next Date:</body>
          <h3 className={classes.sectionSubTitle}>14.04.2021</h3>
        </div>
      </div>
    </div>
  );
};
export default Dividends;

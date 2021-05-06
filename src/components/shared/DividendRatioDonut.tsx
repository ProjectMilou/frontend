import React from 'react';
import Chart from 'react-apexcharts';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    chartContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    chartWrapper: {
      flexBasis: '100%',
      top: '0',
    },
    textWrapper: {
      position: 'absolute',
      height: '95%',
      width: '100%',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.primary.dark,
      fontFamily: typography.fontFamily,
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  })
);

// RatioDonut props type declaration
type RatioDonutProps = {
  ratio: number;
};

/**
 * @param ratio - Ratio will be shown on the donut chart
 * @return Dividend payout ratio donut with the number in the middle
 */
const RatioDonut: React.FC<RatioDonutProps> = ({ ratio }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [series, setSeries] = React.useState<number[]>([]);
  React.useEffect(() => {
    if (!Number.isNaN(ratio)) {
      setSeries([ratio, 1 - ratio]);
    } else {
      setSeries([]);
    }
  }, [ratio]);

  const options = {
    fill: {
      colors: ['#00e396', '#008ffb'],
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    noData: {
      text: 'Dividend is not paid.',
      align: 'left',
      verticalAlign: 'top',
      style: {
        color: theme.palette.primary.dark,
        fontFamily: theme.typography.fontFamily,
        fontSize: '1.15rem',
        fontWeight: 600,
      },
    },
  };

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartWrapper}>
        <Chart
          options={options}
          series={series}
          type="donut"
          height="100%"
          width="100%"
        />
        <div className={classes.textWrapper}>
          {!Number.isNaN(ratio) && (
            <p style={{ margin: 0 }}>{`${(ratio * 100).toFixed(0)}%`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatioDonut;

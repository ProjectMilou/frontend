import React from 'react';
import Chart from 'react-apexcharts';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    chartContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    chartWrapper: {
      flexBasis: '50%',
    },
    textWrapper: {
      position: 'absolute',
      height: '95%',
      width: '100%',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: typography.fontFamily,
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  })
);

type RatioDonutProps = {
  // a number between 0 and 100 representing the ratio
  ratio: number;
  textColor: string;
};

const RatioDonut: React.FC<RatioDonutProps> = ({ ratio, textColor }) => {
  const classes = useStyles();
  const theme = useTheme();

  const series = [ratio, 100 - ratio];
  const options = {
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    fill: {
      colors: [theme.palette.success, theme.palette.lightBlue],
    },
    chart: {
      redrawOnWindowResize: false,
      redrawOnParentResize: false,
    },
    stroke: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartWrapper}>
        <Chart
          options={options}
          series={series}
          type="donut"
          height={140}
          width="100%"
        />
        <div className={classes.textWrapper}>
          <span style={{ margin: 0, color: textColor }}>{`${ratio}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default RatioDonut;

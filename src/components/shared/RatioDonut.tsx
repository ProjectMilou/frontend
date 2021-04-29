import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
  ratio: number;
  textColor: string;
};

/**
 *
 * @param ratio -  A number between 0 and 100 representing the ratio
 * @param textColor - The color of the inner text
 * @returns A small donut chart with inner text
 */

const RatioDonut: React.FC<RatioDonutProps> = ({ ratio, textColor }) => {
  const classes = useStyles();

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
      colors: ['#00e396', '#008ffb'],
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

import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles, createStyles, Theme, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LimitString from './LimitedString';
import { roundAxis } from '../../portfolio/Helper';

type StyleProps = {
  color?: string;
};

const useStyles = makeStyles<Theme, StyleProps>(({ palette }: Theme) =>
  createStyles({
    graphWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginTop: '1rem',
    },
    legend: {
      margin: '1rem',
      alignSelf: 'center',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      color: palette.primary.contrastText,
      marginBottom: '0.5rem',
    },
    legendDot: {
      minWidth: '0.8rem',
      minHeight: '0.8rem',
      borderRadius: '50%',
      backgroundColor: (props) => props.color,
      marginRight: '0.5rem',
    },
    otherText: {
      userSelect: 'none',
      color: palette.primary.contrastText,
    },
  })
);

type LegendItemProps = {
  name: string;
  color: string;
};

/**
 * An entry in the custom legend comprised of a colored dot and text.
 *
 * @param name - Name for the label
 * @param color - Color of the dot
 */

const LegendItem: React.FC<LegendItemProps> = ({ name, color }) => {
  const classes = useStyles({ color });

  return (
    <div className={classes.legendItem}>
      <div className={classes.legendDot} />
      <LimitString value={name} length={40} />
    </div>
  );
};

type DetailsDonutProps = {
  portions: number[];
  labels: string[];
  size: number;
};

/**
 * This component is a donut chart with a custom legend below it.
 * The legend is limited to 5 labels (the last being other which show the rest on hover).
 *
 * @param portions - The data for the graph
 * @param labels - The labels for the graph and legend
 * @param size - The size of the graph
 */

const DetailsDonut: React.FC<DetailsDonutProps> = ({
  portions,
  labels,
  size,
}) => {
  const classes = useStyles({});
  const { t } = useTranslation();

  // all possible colors that this graph can use
  const colors: string[] = [
    '#008FFB',
    '#00E396',
    '#FF4560',
    '#775DD0',
    '#c7f464',
    '#3f51b5',
    '#4caf50',
    '#f9ce1d',
    '#13d8aa',
    '#c7f464',
    '#81D4FA',
    '#f9a3a4',
    '#f9a3a4',
    '#F86624',
    '#2E294E',
    '#1B998B',
    '#662E9B',
    '#8D5B4C',
    '#A300D6',
  ];

  const options = {
    tooltip: {
      y: {
        formatter: (tooltipValue: number) => roundAxis(tooltipValue),
      },
    },
    labels,
    colors,
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    // this scales the chart at certain break points to make
    // sure the chart stays visible at all screen sizes
    responsive: [
      {
        breakpoint: 10000,
        options: {
          chart: {
            height: size,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: size / 1.2,
          },
        },
      },
    ],
  };

  // excluding 'other ...'
  const legendLength = 4;

  const legendItems: JSX.Element[] = [];

  for (let i = 0; i < labels.length; i += 1) {
    legendItems[i] = (
      <LegendItem key={i} name={labels[i]} color={colors[i % colors.length]} />
    );
  }

  const shownLegendItems: JSX.Element[] = legendItems.slice(0, legendLength);
  const hiddenLegendItems: JSX.Element[] = legendItems.slice(legendLength);

  return (
    <div className={classes.graphWrapper}>
      <div className={classes.chart}>
        <Chart
          options={options}
          series={portions}
          type="donut"
          height={size}
          width="100%"
        />
      </div>
      <div className={classes.legend}>
        {shownLegendItems}
        {!!hiddenLegendItems.length && (
          <Tooltip title={hiddenLegendItems}>
            <span className={classes.otherText}>
              {t('portfolio.details.other')}
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default DetailsDonut;

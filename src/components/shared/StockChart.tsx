import React from 'react';
import ReactApexChart from 'react-apexcharts';
// import ChartType from 'apexcharts'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// TODO  find type
// eslint-disable-next-line
declare let ApexCharts: any;

type StockChartProps = {
  // series array with unix timestamp and value
  series: number[][];
  // used to get more data than 5 years
  setPerformanceAll?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  axisColor: string;
  height: number;
};

let selection = 'one_year';

const newestTimestamp = (series: number[][]) => series[series.length - 1][0];
// const oldestTimestamp = (series: number[][]) => series[0][0];

const timestamp1month = (series: number[][]) => {
  const newest = newestTimestamp(series);
  const goal = newest - 2629800000;
  const allTimestamps = series.map((s) => s[0]);

  // closest timestamp  https://stackoverflow.com/a/19277804
  const closest = allTimestamps.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return closest;
};

const timestamp3months = (series: number[][]) => {
  const newest = newestTimestamp(series);
  const goal = newest - 7889400000;
  const allTimestamps = series.map((s) => s[0]);

  // closest timestamp  https://stackoverflow.com/a/19277804
  const closest = allTimestamps.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return closest;
};

const timestamp1year = (series: number[][]) => {
  const newest = newestTimestamp(series);
  const goal = newest - 31556952000;
  const allTimestamps = series.map((s) => s[0]);

  // closest timestamp  https://stackoverflow.com/a/19277804
  const closest = allTimestamps.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return closest;
};

const timestamp3years = (series: number[][]) => {
  const newest = newestTimestamp(series);
  const goal = newest - 94672800000;
  const allTimestamps = series.map((s) => s[0]);

  // closest timestamp  https://stackoverflow.com/a/19277804
  const closest = allTimestamps.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return closest;
};

const timestamp5years = (series: number[][]) => {
  const newest = newestTimestamp(series);
  const goal = newest - 157788000000;
  const allTimestamps = series.map((s) => s[0]);

  // closest timestamp  https://stackoverflow.com/a/19277804
  const closest = allTimestamps.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return closest;
};

const timestampYTD = (series: number[][]) => {
  const newest = newestTimestamp(series);
  const year = new Date(newest).getFullYear();
  const goal = new Date(`01 Jan ${year}`).getTime();
  const allTimestamps = series.map((s) => s[0]);

  // closest timestamp  https://stackoverflow.com/a/19277804
  const closest = allTimestamps.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return closest;
};

const updateData = (series: number[][], timeline: string) => {
  selection = timeline;

  switch (timeline) {
    case 'one_month':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(timestamp1month(series)).getTime(),
        new Date(newestTimestamp(series)).getTime()
      );
      break;
    case 'three_months':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(timestamp3months(series)).getTime(),
        new Date(newestTimestamp(series)).getTime()
      );
      break;
    case 'one_year':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(timestamp1year(series)).getTime(),
        new Date(newestTimestamp(series)).getTime()
      );
      break;
    case 'three_years':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(timestamp3years(series)).getTime(),
        new Date(newestTimestamp(series)).getTime()
      );
      break;
    case 'five_years':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(timestamp5years(series)).getTime(),
        new Date(newestTimestamp(series)).getTime()
      );
      break;
    case 'ytd':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(timestampYTD(series)).getTime(),
        new Date(newestTimestamp(series)).getTime()
      );
      break;
    case 'all':
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(series[0][0]).getTime(), // oldest date in stock series
        new Date(newestTimestamp(series)).getTime() // newest date of stock series
      );
      break;
    default:
  }
};

const Datetime: React.FC<StockChartProps> = ({
  series,
  setPerformanceAll,
  buttonBackgroundColor,
  buttonTextColor,
  axisColor,
  height,
}) => {
  const options = {
    colors: ['#4392F1'],
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
      color: '#00000',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      min: new Date(series[0][0]).getTime(),
      tickAmount: 6,
      labels: {
        style: {
          colors: axisColor,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: axisColor,
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    noData: {
      text: 'Loading...',
    },
  };

  const buttonStyling = {
    backgroundColor: buttonBackgroundColor,
    color: buttonTextColor,
  };

  return (
    <Box style={{ marginTop: '20px' }}>
      <div id="chart">
        <div className="toolbar">
          <Button
            type="button"
            id="one_month"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData(series, 'one_month')}
            className={selection === 'one_month' ? 'active' : ''}
          >
            1M
          </Button>
          &nbsp;
          <Button
            type="button"
            id="three_months"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData(series, 'three_months')}
            className={selection === 'six_months' ? 'active' : ''}
          >
            3M
          </Button>
          &nbsp;
          <Button
            type="button"
            id="one_year"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData(series, 'one_year')}
            className={selection === 'one_year' ? 'active' : ''}
          >
            1Y
          </Button>
          &nbsp;
          <Button
            type="button"
            id="five_years"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData(series, 'five_years')}
            className={selection === 'one_year' ? 'active' : ''}
          >
            5Y
          </Button>
          &nbsp;
          <Button
            type="button"
            id="ytd"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData(series, 'ytd')}
            className={selection === 'ytd' ? 'active' : ''}
          >
            YTD
          </Button>
          &nbsp;
          <Button
            type="button"
            id="all"
            variant="contained"
            style={buttonStyling}
            onClick={() => {
              if (setPerformanceAll !== undefined) {
                setPerformanceAll(true);
              }
              updateData(series, 'all');
            }}
            className={selection === 'all' ? 'active' : ''}
          >
            ALL
          </Button>
        </div>

        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={[
              {
                name: 'performance',
                data: series,
              },
            ]}
            type="area"
            height={height}
            width="100%"
          />
        </div>
      </div>
    </Box>
  );
};

export default Datetime;

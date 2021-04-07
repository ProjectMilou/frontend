import React from 'react';
import ReactApexChart from 'react-apexcharts';
// import ChartType from 'apexcharts'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// TODO  findt type
// eslint-disable-next-line
declare let ApexCharts: any;

type StockChartProps = {
  // series array with unix timestamp and value
  series: number[][];
  buttonBackgroundColor: string;
  buttonTextColor: string;
  axisColor: string;
  height: number;
  chartID: string;
};

let selection = 'one_year';

const updateData = (timeline: string, chartID: string) => {
  selection = timeline;

  switch (timeline) {
    case 'one_month':
      ApexCharts.exec(
        chartID,
        'zoomX',
        new Date('28 Jan 2013').getTime(),
        new Date('27 Feb 2013').getTime()
      );
      break;
    case 'six_months':
      ApexCharts.exec(
        chartID,
        'zoomX',
        new Date('27 Sep 2012').getTime(),
        new Date('27 Feb 2013').getTime()
      );
      break;
    case 'one_year':
      ApexCharts.exec(
        chartID,
        'zoomX',
        new Date('27 Feb 2012').getTime(),
        new Date('27 Feb 2013').getTime()
      );
      break;
    case 'ytd':
      ApexCharts.exec(
        chartID,
        'zoomX',
        new Date('01 Jan 2013').getTime(),
        new Date('27 Feb 2013').getTime()
      );
      break;
    case 'all':
      ApexCharts.exec(
        chartID,
        'zoomX',
        new Date('23 Jan 2012').getTime(),
        new Date('27 Feb 2013').getTime()
      );
      break;
    default:
  }
};

const Datetime: React.FC<StockChartProps> = ({
  series,
  buttonBackgroundColor,
  buttonTextColor,
  axisColor,
  height,
  chartID,
}) => {
  const options = {
    colors: ['#4392F1'],
    chart: {
      id: chartID,
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
      min: new Date('01 MAR 2012').getTime(),
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
    <Box style={{ marginTop: '20px', marginBottom: '80px' }}>
      <div id="chart">
        <div className="toolbar">
          <Button
            type="button"
            id="one_month"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData('one_month', chartID)}
            className={selection === 'one_month' ? 'active' : ''}
          >
            1M
          </Button>
          &nbsp;
          <Button
            type="button"
            id="six_months"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData('six_months', chartID)}
            className={selection === 'six_months' ? 'active' : ''}
          >
            6M
          </Button>
          &nbsp;
          <Button
            type="button"
            id="one_year"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData('one_year', chartID)}
            className={selection === 'one_year' ? 'active' : ''}
          >
            1Y
          </Button>
          &nbsp;
          <Button
            type="button"
            id="ytd"
            variant="contained"
            style={buttonStyling}
            onClick={() => updateData('ytd', chartID)}
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
            onClick={() => updateData('all', chartID)}
            className={selection === 'all' ? 'active' : ''}
          >
            ALL
          </Button>
        </div>

        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={[{ data: series }]}
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

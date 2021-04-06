import React from 'react';
import Chart from 'react-apexcharts';

export type Series = {
  name: string;
  data: number[];
};

type AnalysisChartProps = {
  series: number[];
};

const AnalysisChart: React.FC<AnalysisChartProps> = ({
  series
}
) => {
  const options = {
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        },
      },
    },
    fill: {
      type: 'gradient',
      colors: '#3da97e',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#B80C09', '#3da97e'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0,100],
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
         hollow: {
          margin: 0,
          size: '70%',
          background: '#EEF1FB',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#EEF1FB',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
    
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function format(val: string) {
              return parseInt(val, 10);
            },
            color: '#122654',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Percent'],

  };
  return (
    <div id="card">
    <div id="chart">
    <Chart options={options} series={series} type="radialBar" height={350} />
  </div>
  </div>

  );
};

export default AnalysisChart;

import React from 'react';
import Chart from 'react-apexcharts';

export type Series = {
  name: string;
  data: number[];
};

type AnalysisChartProps = {
  series: Series[];
  textColor: string;
  height: number;
};

const AnalysisChart: React.FC<AnalysisChartProps> = ({
  series,
  textColor,
  height,
}) => {
  const options = {
    chart: {
        type: 'bar',
        height: 570,
        stacked: true,
        stackType: '100%',
        animations: {
            enabled: false
          }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 5,
        colors: ['#EEF1FB']
      },
      title: {
        text: 'Analysis Chart'
      },
      fill: {
        type: 'image',
        opacity: 1,
                image: {
                  src: ['../../../assets/images/AnalysisChart.jpg'],
                }
      },
      grid:{
        show: false
      },
      yaxis:{
          show:false
      },
      xaxis:{
          show:false
      }
    }
  return (
    <div id="chart">
    <Chart options={options} series={series} type="bar" height={300} />
  </div>
  );
};

export default AnalysisChart;

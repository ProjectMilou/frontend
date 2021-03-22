import React from 'react'
import ReactApexChart from 'react-apexcharts'

const state = {
          
    series: [{
      name: 'Series 1',
      data: [80, 50, 30, 40, 100, 20],
    }],
    options: {
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false,
        },
      },
      title: {
        text: 'Radar Analysis'
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June']
      }
    },
  };

const Radar: React.FC = () => 
    (
      <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="radar" height={350} width="20%"/>
      </div>
    )
  

export default Radar

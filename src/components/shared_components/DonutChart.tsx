import React from 'react'
import ReactApexChart from 'react-apexcharts'

 const state = {
          
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };


const DonutChart: React.FC = () => 
    (
      <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="donut" height={350} width="100%"/>
      </div>
    )
  

export default DonutChart

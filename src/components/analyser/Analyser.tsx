import React from 'react'
import Hello from '../shared_components/Hello'
import Radar from '../shared_components/Radar'
import Testchart from '../shared_components/Testchart'
import Datetime from '../shared_components/Datetime'
import TimsChart from '../shared_components/TimsChart'

const Analyser: React.FC = () => 
    (
        <div>
            <Hello/>
            <Testchart/>
            <Radar/>
            <Datetime/>
            <TimsChart/>
        </div>
    )

export default Analyser

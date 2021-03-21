import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Hello from '../shared_components/Hello'
import Radar from '../shared_components/Radar'
import Testchart from '../shared_components/Testchart'
import Datetime from '../shared_components/Datetime'
import DividendsChart from '../shared_components/DividendsChart'
import TestStyling from '../shared_components/TestStyling'
import PriceBar from '../shared_components/PriceBar'
import Search from '../shared_components/Search'
import Summary from '../shared_components/Summary'

const useStyles = makeStyles((theme) => ({
    background: {
        background: '#EEF1FB',
    }
}));

const Analyser: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <PriceBar/>
            <Summary/>
            <Datetime/>
            <DividendsChart/>
            <Search/>
        </div>
    )
    }
export default Analyser

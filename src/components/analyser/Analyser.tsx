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
import Filter from '../shared_components/Filter';
import StockCard from '../shared_components/SimpleCard';

const useStyles = makeStyles((theme) => ({
    background: {
        background: '#EEF1FB',
    }
}));

type CardProps = {
    title: string,
    paragraph: string
  }

const Analyser: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <PriceBar/>
            <Summary/>
            <Datetime/>
            <DividendsChart/>
            <Search/>
            <Filter/>
            <StockCard />
        </div>
    )
    }
export default Analyser

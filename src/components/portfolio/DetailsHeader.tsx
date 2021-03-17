import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DetailsEdit from './DetailsEdit';

const title = 'My Portfolio';

export type DetailsHeaderProps = {
    back: ()=>void
  };

const useStyles = makeStyles({
    topContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '95%',
        height: '100%',
        margin: '0 auto',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    backButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    editButton: {
        padding: '0.25rem 1rem',
        backgroundColor: '#3fbcf2',
        '&:hover': {
            backgroundColor: '#84d4f7',
        },
    },
    subContainer: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: '2.5rem',
    },
  });

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ back }) => {
    const classes = useStyles();
    
     return (
        <div id='topContainer' className={classes.topContainer}>
            <div id='titleContainer' className={classes.titleContainer}>
                <div className={classes.backButtonContainer}>
                <IconButton aria-label="back" onClick = {back}> <ArrowBackIosIcon fontSize="large" /> </IconButton>
                </div>
                <div>
                    <p className={classes.title}>{title}</p>
                </div>
            </div>
            <DetailsEdit/>
        </div>
    );
}

export default DetailsHeader;
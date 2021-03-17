import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
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
  });

const DetailsEdit: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    
     return (
        <div id='subContainer' className={classes.subContainer}>
            <div style={{marginLeft: '3.8rem',}}>
                <Button variant="contained" id="editButton" className={classes.editButton}>{t('editPortfolio')}</Button>
            </div>
        </div>
    );
}

export default DetailsEdit;
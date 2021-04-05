import React from 'react';
import {
  IconButton,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import TextOverText from '../TextOverText';
import * as API from '../../../analyser/APIClient';
import EuroCurrency from '../../shared/EuroCurrency';

export type DetailsProps = {
  details: API.Stock;
  // function to return to the dashboard
  back: () => void;
};

const useStyles = makeStyles({
  header: {
    'background-color': '#0D1B3B',
  },
  text: {
    'font-size': '35px',
    color: '#EEF1FB',
    padding: '50px 0',
    minWidth: '50%',
    maxWidth: '1000px',
  },
  price: {
    paddingLeft: '6',
  },
  wknIsin: {
    'font-size': '12px',
    color: '#EEF1FB',
    minWidth: '50%',
    maxWidth: '1000px',
    marginLeft: '100px',
  },
  infoValueWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  backButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
});

// TODO: no hard coded colors
// takes a percent value and converts it to a color
function convertPercentToColor(val: number): string {
  return val < 0 ? '#D64745' : '#50E2A8';
}

function chooseSymbol(val: API.Stock): string {
  return val.name.length > 25 ? val.symbol : val.name;
}

const DetailsHeader: React.FC<DetailsProps> = ({ details, back }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.header}>
      <Container maxWidth="lg">
        <Typography className={classes.text}>
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '35%' }}
          >
            <div className={classes.backButtonContainer}>
              <IconButton
                aria-label="back"
                onClick={back}
                style={{ backgroundColor: 'transparent' }}
              >
                <ArrowBackIosIcon
                  fontSize="large"
                  style={{ color: '#EEF1FB' }}
                />
              </IconButton>
            </div>
            {chooseSymbol(details)}
            <>&emsp;&emsp;&emsp;</>
            <EuroCurrency
              value={details.price}
              size="35px"
              color="#EEF1FB"
              decimalSeperator="."
              thousandSeperator=","
            />
            <>&emsp;&emsp;</>
            <TextOverText
              top={`${details['1d']}%`}
              bottom={t('stock.1d')}
              colorTop={convertPercentToColor(details['1d'])}
              colorBottom="#EEF1FB"
            />
            <>&emsp;&emsp;</>
            <TextOverText
              top={`${details['7d']}%`}
              bottom={t('stock.7d')}
              colorTop={convertPercentToColor(details['7d'])}
              colorBottom="#EEF1FB"
            />
            <>&emsp;&emsp;</>
            <TextOverText
              top={`${details['30d']}%`}
              bottom={t('stock.30d')}
              colorTop={convertPercentToColor(details['30d'])}
              colorBottom="#EEF1FB"
            />
          </div>
          <Typography className={classes.wknIsin}>
            <>WKN: </>
            {details.WKN}
            <> / ISIN: </>
            {details.ISIN}
          </Typography>
        </Typography>
      </Container>
    </div>
  );
};

export default DetailsHeader;

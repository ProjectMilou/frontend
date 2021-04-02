import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ValueOverName from '../../shared/ValueOverName';
import * as API from '../../../analyser/APIClient';
import EuroCurrency from '../../shared/EuroCurrency';

export type DetailsProps = {
  details: API.Stock;
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
  },
  infoValueWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
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

const DetailsHeader: React.FC<DetailsProps> = ({ details }) => {
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
            {chooseSymbol(details)}
            <>&emsp;&emsp;&emsp;</>
            <EuroCurrency
              value={details.price}
              size="35px"
              decimalSeperator="."
              thousandSeperator=","
            />
            <>&emsp;&emsp;</>
            <ValueOverName
              value={`${details['1d']}%`}
              name={t('stock.1d')}
              valueColor={convertPercentToColor(details['1d'])}
            />
            <>&emsp;&emsp;</>
            <ValueOverName
              value={`${details['7d']}%`}
              name={t('stock.7d')}
              valueColor={convertPercentToColor(details['7d'])}
            />
            <>&emsp;&emsp;</>
            <ValueOverName
              value={`${details['30d']}%`}
              name={t('stock.30d')}
              valueColor={convertPercentToColor(details['30d'])}
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

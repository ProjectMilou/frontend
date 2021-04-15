import React from 'react';
import {
  IconButton,
  Container,
  makeStyles,
  Typography,
  Theme,
  createStyles,
  useTheme
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import TextOverText from '../TextOverText';
import * as API from '../../../analyser/APIClient';
import StyledNumberFormat from '../../shared/StyledNumberFormat';

export type DetailsProps = {
  details: API.Stock;
  // function to return to the dashboard
  back: () => void;
};

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
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
      color: '#EEF1FB',
    },
    backButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    backButton: {
      color: palette.background.default,
    },
  })
);

// TODO: no hard coded colors
// takes a percent value and converts it to a color
function convertPercentToColor(val: number): string {
  return val < 0 ? '#D64745' : '#50E2A8';
}

function chooseSymbol(val: API.Stock): string {
  return val.name.length > 15 ? val.symbol : val.name;
}

const DetailsHeader: React.FC<DetailsProps> = ({ details, back }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

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
                  className={classes.backButton}
                />
              </IconButton>
            </div>
            {chooseSymbol(details)}
            <>&emsp;&emsp;&emsp;</>
            <StyledNumberFormat
              // Fix: Divided by 1 because Back-End only provides string
              value={details.price/1}
              suffix="€"
              size="35px"
              paintJob= {theme.palette.background.default}
            />
            <TextOverText
              top={`${details.per1d}%`}
              bottom={t('stock.1d')}
              colorTop={convertPercentToColor(details.per1d)}
              colorBottom= {theme.palette.background.default}
            />
            <>&emsp;&emsp;</>
            <TextOverText
              top={`${details.per7d}%`}
              bottom={t('stock.7d')}
              colorTop={convertPercentToColor(details.per7d)}
              colorBottom="#EEF1FB"
            />
            <>&emsp;&emsp;</>
            <TextOverText
              top={`${details.per30d}%`}
              bottom={t('stock.30d')}
              colorTop={convertPercentToColor(details.per30d)}
              colorBottom="#EEF1FB"
            />
          </div>
          <Typography className={classes.wknIsin}>
            <>WKN: </>
            {details.wkn}
            <> / ISIN: </>
            {details.isin}
          </Typography>
        </Typography>
      </Container>
    </div>
  );
};

export default DetailsHeader;

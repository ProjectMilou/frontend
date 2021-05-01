import React from 'react';
import {
  IconButton,
  Container,
  makeStyles,
  Typography,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import TextOverText from '../../shared/TextOverText';
import * as API from '../../../analyser/APIClient';
import StyledNumberFormat from '../../shared/StyledNumberFormat';

export type DetailsHeaderProps = {
  stock?: API.Stock;
  // function to return to the dashboard
  back: () => void;
};

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    header: {
      backgroundColor: palette.primary.dark,
      width: '100%',
      height: 220,
    },
    text: {
      fontSize: '35px',
      color: palette.primary.contrastText,
      padding: '50px 0',
      minWidth: '50%',
      maxWidth: '1000px',
    },
    price: {
      paddingLeft: 6,
    },
    wknIsin: {
      fontSize: '12px',
      color: palette.primary.contrastText,
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
    backButton: {
      color: palette.background.default,
    },
    date: {
      paddingBottom: 10,
      color: palette.primary.contrastText,
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

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ stock, back }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div className={classes.header}>
      {
        // stock can also be undefined, in this case we return an empty blue div
        stock !== undefined && (
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
                {chooseSymbol(stock)}
                <>&emsp;&emsp;&emsp;</>
                <StyledNumberFormat
                  // Fix: Divided by 1 because Back-End only provides string
                  value={stock.price}
                  suffix="€"
                  size="35px"
                  paintJob={theme.palette.background.default}
                />
                <>&nbsp;&emsp;</>
                <TextOverText
                  top={`${stock.per7d.toFixed(2)} %`}
                  bottom={t('stock.7d')}
                  colorTop={convertPercentToColor(stock.per7d)}
                  colorBottom={theme.palette.background.default}
                />
                <>&nbsp;&emsp;</>
                <TextOverText
                  top={`${stock.per30d.toFixed(2)} %`}
                  bottom={t('stock.30d')}
                  colorTop={convertPercentToColor(stock.per30d)}
                  colorBottom={theme.palette.background.default}
                />
                <>&nbsp;&emsp;</>
                <TextOverText
                  top={`${stock.per365d.toFixed(2)} %`}
                  bottom={t('stock.365d')}
                  colorTop={convertPercentToColor(stock.per365d)}
                  colorBottom={theme.palette.background.default}
                />
              </div>
              <Typography className={classes.wknIsin}>
                <>WKN: </>
                {stock.wkn}
                <> / ISIN: </>
                {stock.isin}
              </Typography>
            </Typography>
            <Typography className={classes.date}>
              Last updated:{' '}
              {stock
                ? new Date(stock.date).toISOString().split('T')[0]
                : undefined}
            </Typography>
          </Container>
        )
      }
    </div>
  );
};

export default DetailsHeader;

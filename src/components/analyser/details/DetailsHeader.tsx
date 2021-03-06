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
import { convertPercentToColor, chooseSymbol } from '../../../analyser/Helper';

type DetailsHeaderProps = {
  stock: API.Stock;
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
    icon: {
      backgroundColor: 'transparent',
    },
    date: {
      paddingBottom: 10,
      color: palette.primary.contrastText,
    },
  })
);

/**
 * Header component that displays stock name and prices
 *
 * @param stock Stock Overview to display in header
 * @param back Function to get back to analyser search page
 *
 */
const DetailsHeader: React.FC<DetailsHeaderProps> = ({ stock, back }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  /* {!stock && (
        <Container maxWidth="lg">
          <div className={classes.text} />
        </Container>
      )} */
  return (
    <div className={classes.header}>
      <Container maxWidth="lg">
        <div className={classes.text}>
          <div
            className={classes.infoValueWrapper}
            style={{ flexBasis: '35%' }}
          >
            <div className={classes.backButtonContainer}>
              <IconButton
                aria-label="back"
                onClick={() => back()}
                className={classes.icon}
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
        </div>
        <Typography className={classes.date}>
          {`${t('analyser.details.lastUpdated')}: `}
          {stock ? new Date(stock.date).toISOString().split('T')[0] : undefined}
        </Typography>
      </Container>
    </div>
  );
};

export default DetailsHeader;

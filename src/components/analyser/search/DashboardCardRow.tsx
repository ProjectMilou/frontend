import React from 'react';
import { navigate } from '@reach/router';
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  ButtonBase,
  useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import TextOverText from '../../shared/TextOverText';
import CompanyLogo from '../CompanyLogo';
import { convertPercentToColor } from '../../../analyser/Helper';

const useStyles = makeStyles(() => ({
  card: {
    width: 289,
    margin: 10,
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  media: {
    height: 200,
    width: 289,
    placeItems: 'center',
    alignItems: 'center',
    objectFit: 'scale-down',
    padding: 20,
  },
  content: {
    margin: 10,
  },
  divider: {
    margin: `${30}px 0`,
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  rightBound: {
    float: 'right',
  },
  leftBound: {
    float: 'left',
  },
  paddingBottom: {
    paddingBottom: 40,
  },
}));

type DashboardCardsRowProps = {
  stock: API.Stock;
};

/**
 * component for dashboard card rows
 *
 * @param stock single Stock overview to display data
 *
 */
export const DashboardCardsRow: React.FC<DashboardCardsRowProps> = ({
  stock,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.cardAction}
        onClick={() => navigate(`analyser/${stock.symbol}`)}
      >
        <CardMedia>
          <CompanyLogo stockOverview={stock} style={classes.media} />
        </CardMedia>
        <CardContent className={classes.content}>
          <TextOverText
            top={`${stock.symbol}`}
            bottom={`${stock.name}`}
            colorTop={theme.palette.grey[700]}
            sizeBottom="1.3rem"
            alignment="left"
          />
          <Divider className={classes.divider} light />
          <div className={classes.paddingBottom}>
            <div className={classes.leftBound}>
              <TextOverText
                top={t('analyser.dashboard.view.cards.lastPrice')}
                colorTop={theme.palette.grey[700]}
                bottom={`${stock.price}`}
                currency={`${stock.currency}`}
                sizeBottom="1.3rem"
              />
            </div>
            <div className={classes.rightBound}>
              <TextOverText
                top={t('stock.30d')}
                bottom={`${stock.per30d.toFixed(2)}%`}
                colorTop={theme.palette.grey[700]}
                colorBottom={convertPercentToColor(stock.per30d)}
                sizeBottom="1.3rem"
              />
            </div>
          </div>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default DashboardCardsRow;

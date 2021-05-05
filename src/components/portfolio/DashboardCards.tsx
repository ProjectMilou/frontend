import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardActions,
  CardContent,
  GridList,
  GridListTile,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ImportIcon from '@material-ui/icons/Input';
import classNames from 'classnames';
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';
import DashboardActions from './DashboardActions';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import { importPortfolio, portfolioDetails } from '../../portfolio/Router';
import LimitedString from './LimitedString';

const useStyles = makeStyles(({ palette }) => ({
  gridList: {
    width: '100%',
    height: 'auto',
    margin: '0 auto !important',
  },
  gridListTile: {
    minWidth: '12rem',
  },
  card: {
    cursor: 'pointer',
  },
  blankCard: {
    height: '13rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderColor: 'grey',
  },
  createPortfolioCard: {
    '&:hover': {
      borderColor: palette.primary.main,
      '& svg': {
        color: palette.primary.main,
      },
    },
  },
  importPortfolioCard: {
    '&:hover': {
      borderColor: palette.secondary.main,
      '& svg': {
        color: palette.secondary.main,
      },
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardActions: {
    justifyContent: 'center',
  },
  portName: {
    fontSize: '1.5rem',
  },
  value: {
    marginTop: '1rem',
    alignSelf: 'center',
  },
}));

type CardComponentProps = {
  portfolio: PortfolioOverview;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
};

const CardComponent: React.FC<CardComponentProps> = ({
  portfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card
      className={classes.card}
      onClick={() => portfolioDetails(portfolio.id)}
    >
      <CardContent className={classes.cardContent}>
        <Typography className={classes.portName}>
          <LimitedString value={portfolio.name} />
        </Typography>
        <Typography color={portfolio.virtual ? 'textSecondary' : 'secondary'}>
          {portfolio.virtual ? t('portfolio.virtual') : t('portfolio.real')}
        </Typography>
        <div className={classes.value}>
          <StyledNumberFormat
            value={portfolio.value}
            suffix="€"
            size="24"
            fontWeight={400}
          />
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <DashboardActions
          portfolio={portfolio}
          renamePortfolio={renamePortfolio}
          duplicatePortfolio={duplicatePortfolio}
          deletePortfolio={deletePortfolio}
        />
      </CardActions>
    </Card>
  );
};

export type DashboardCardsProps = {
  portfolios: API.PortfolioOverview[];
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
  createPortfolio: () => void;
};

/**
 * This component represents all portfolios in a card view.
 * Each card has the portfolios name, the total value, whether it is virtual
 * and an action bar to rename, duplicate, or delete.
 * In addition to the portfolio cards there are two button cards:
 * import and create portfolio.
 *
 * @param portfolios - The portfolios of a user to be displayed in card form
 * @param renamePortfolio - A function to rename a portfolio
 * @param duplicatePortfolio - A function to duplicate a portfolio
 * @param deletePortfolio - A function to delete a portfolio
 * @param createPortfolio - A function to create a portfolio
 */

const DashboardCards: React.FC<DashboardCardsProps> = ({
  portfolios,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
  createPortfolio,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <GridList
      cellHeight="auto"
      cols={4}
      spacing={32}
      className={classes.gridList}
    >
      {portfolios.map((p) => (
        <GridListTile key={p.id} className={classes.gridListTile}>
          <CardComponent
            key={p.id}
            portfolio={p}
            renamePortfolio={renamePortfolio}
            duplicatePortfolio={duplicatePortfolio}
            deletePortfolio={deletePortfolio}
          />
        </GridListTile>
      ))}
      <GridListTile className={classes.gridListTile}>
        <Card
          className={classNames(
            classes.card,
            classes.blankCard,
            classes.createPortfolioCard
          )}
          onClick={() => createPortfolio()}
        >
          <Tooltip title={t('portfolio.dashboard.createPortfolio').toString()}>
            <div>
              <IconButton>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </div>
          </Tooltip>
        </Card>
      </GridListTile>
      <GridListTile className={classes.gridListTile}>
        <Card
          className={classNames(
            classes.card,
            classes.blankCard,
            classes.importPortfolioCard
          )}
          onClick={() => importPortfolio()}
        >
          <Tooltip title={t('portfolio.dashboard.importPortfolio').toString()}>
            <div>
              <IconButton>
                <ImportIcon fontSize="large" />
              </IconButton>
            </div>
          </Tooltip>
        </Card>
      </GridListTile>
    </GridList>
  );
};

export default DashboardCards;

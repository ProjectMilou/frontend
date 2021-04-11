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
import * as API from '../../portfolio/APIClient';
import { PortfolioOverview } from '../../portfolio/APIClient';
import DashboardActions from './DashboardActions';
import StyledNumberFormat from '../shared/StyledNumberFormat';
import { importPortfolio, portfolioDetails } from '../../portfolio/Router';

const useStyles = makeStyles(() => ({
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
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.portName}>{portfolio.name}</Typography>
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
        <GridListTile
          key={p.id}
          onClick={() => portfolioDetails(p.id)}
          className={classes.gridListTile}
        >
          <CardComponent
            key={p.id}
            portfolio={p}
            renamePortfolio={renamePortfolio}
            duplicatePortfolio={duplicatePortfolio}
            deletePortfolio={deletePortfolio}
          />
        </GridListTile>
      ))}
      <GridListTile
        className={classes.gridListTile}
        onClick={() => {
          createPortfolio();
        }}
      >
        <Card className={classes.blankCard}>
          <Tooltip title={t('portfolio.create').toString()}>
            <div>
              <IconButton>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </div>
          </Tooltip>
        </Card>
      </GridListTile>
      <GridListTile
        className={classes.gridListTile}
        onClick={() => importPortfolio()}
      >
        <Card className={classes.blankCard}>
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

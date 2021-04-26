import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  GridList,
  GridListTile,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Position } from '../../portfolio/APIClient';
import DetailsMainPositionsCard from './DetailsMainPositionsCard';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    gridListWrapper: {
      width: '100%',
      margin: '0 -16px',
    },
    gridList: {
      width: '100%',
      height: 'auto',
    },
    accordionBorder: {
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
      expanded: {},
    },
    accordionSummary: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
      expanded: {},
    },
    accordionContent: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      '&$expanded': {
        margin: '12px 0',
      },
      expanded: {},
    },
    accordionDetails: {
      backgroundColor: palette.primary.main,
      display: 'flex',
      flexDirection: 'column',
    },
    expandIcon: {
      color: palette.primary.contrastText,
    },
  })
);

type ShowMoreAccordionProps = {
  positions: Position[];
};

const ShowMoreAccordion: React.FC<ShowMoreAccordionProps> = ({ positions }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Accordion className={classes.accordionBorder}>
      <AccordionSummary
        className={classNames(
          classes.accordionSummary,
          classes.accordionContent
        )}
        expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
      >
        <Typography>
          {t('portfolio.details.positions.showMore')} ({`${positions.length}`})
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <div className={classes.gridListWrapper}>
          <GridList
            cellHeight="auto"
            cols={4}
            spacing={32}
            className={classes.gridList}
            style={{ margin: '0 auto' }}
          >
            {positions.map((p) => (
              <GridListTile key={p.stock.symbol}>
                <DetailsMainPositionsCard p={p} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShowMoreAccordion;

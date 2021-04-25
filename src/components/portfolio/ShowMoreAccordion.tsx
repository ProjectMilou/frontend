import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  GridList,
  GridListTile,
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
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
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
    showLessButton: {
      color: palette.primary.contrastText,
      textTransform: 'none',
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
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>
          {t('portfolio.details.positions.showMore')} ({`${positions.length}`})
        </div>
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
        <Button size="small" className={classes.showLessButton}>
          {t('portfolio.details.positions.showLess')}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShowMoreAccordion;

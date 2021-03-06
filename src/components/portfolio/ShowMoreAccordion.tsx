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
      marginTop: '2.5rem',
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    accordionContent: {
      backgroundColor: palette.primary.light,
      color: palette.primary.contrastText,
      marginBottom: -1,
      minHeight: 60,
      '&$expanded': {
        margin: 'auto',
        minHeight: 60,
      },
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

/**
 *  Creates a show more bar for the positions on the portfolio details page.
 *
 *  @param positions - The positions that are displayed inside the show more component.
 * */
const ShowMoreAccordion: React.FC<ShowMoreAccordionProps> = ({ positions }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <Accordion
      className={classes.accordionBorder}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        className={classes.accordionContent}
        expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
      >
        <Typography>
          {expanded
            ? t('portfolio.details.positions.showLess')
            : t('portfolio.details.positions.showMore')}
          {` (${positions.length})`}
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

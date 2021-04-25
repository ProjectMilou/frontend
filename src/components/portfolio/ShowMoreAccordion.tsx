import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  GridList,
  GridListTile,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { Position } from '../../portfolio/APIClient';
import DetailsMainPositionsCard from './DetailsMainPositionsCard';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    gridList: {
      width: '100%',
      height: 'auto',
      maxHeight: '50rem',
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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>
          {t('portfolio.details.positions.showMore')} ({`${positions.length}`})
        </div>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default ShowMoreAccordion;

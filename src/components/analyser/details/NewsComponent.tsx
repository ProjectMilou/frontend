import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import NewsCard from './NewsCard';
import * as API from '../../../analyser/APIClient';
import SubsectionDivider from './SubsectionDivider';

export type NewsComponentProps = {
  newsList: API.News[];
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
  })
);

const NewsComponent: React.FC<NewsComponentProps> = ({ newsList }) => {
  const classes = useStyles();

  return (
    <>
      <SubsectionDivider subsection="1.2 Milou News" />
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {newsList.map((news) => (
            <NewsCard news={news} />
          ))}
        </GridList>
      </div>
    </>
  );
};

export default NewsComponent;

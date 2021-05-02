import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import NewsCard from './NewsCard';
import * as API from '../../../analyser/APIClient';
import SubsectionDivider from '../../shared/SubsectionDivider';

export type NewsComponentProps = {
  newsList: API.NewsList;
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

/**
 * This component displays a list of news that can be clicked. News are sorted by date
 * 
 * @param newsList list of news to display
 */
const NewsComponent: React.FC<NewsComponentProps> = ({ newsList }) => {
  const classes = useStyles();
  return (
    <>
      <SubsectionDivider subsection="1.2 Milou News" />
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {newsList.news
            .sort((n1, n2) => {
              if (
                new Date(n1.publishedAt).getTime() -
                  new Date(n2.publishedAt).getTime() <
                0
              ) {
                return 1;
              }
              return -1;
            })
            .map((news) => (
              <NewsCard news={news} key={news.headline} />
            ))}
        </GridList>
      </div>
    </>
  );
};

export default NewsComponent;

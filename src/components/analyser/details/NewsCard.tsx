import React from 'react';
import { Link } from '@reach/router';
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';


export type NewsCardProps = {
  news: API.News 
};

const useStyles = makeStyles({
    root: {
        minWidth: 275,
      },
      divider: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
});


const News: React.FC<NewsCardProps> = ({ news }) => {
  const classes = useStyles();
  const divider = <span className={classes.divider}>|</span>;

  const { t } = useTranslation();
  return (
    <Link to={news.url.toString()}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {t(news.headline)}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {news.date}{divider}{news.url}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};

export default News;

import React from 'react';
import { Link } from '@reach/router';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';

export type NewsCardProps = {
  news: API.News;
};

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  divider: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: 'None',
  },
  card: {
    margin: 15,
  },
});

const News: React.FC<NewsCardProps> = ({ news }) => {
  const classes = useStyles();
  const divider = <span className={classes.divider}> </span>;
  const { t } = useTranslation();

  return (
    <div className={classes.card}>
      <Link to={news.url.toString()} className={classes.link}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.pos}>
              {t(news.headline)}
            </Typography>
            <Typography className={classes.pos}>{t(news.summary)}</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {new Date(news.publishedAt).toISOString().split('T')[0]}
              {divider}
              {news.url.split('/')[2]}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default News;

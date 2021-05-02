import React from 'react';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';

type NewsCardProps = {
  news: API.News;
};

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 300,
  },
  divider: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    display: 'inline-block',
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
  footer: {
    position: 'fixed',
    bottom: 30,
  },
});


/**
 * Component for a single news card
 * 
 * @param news item to display
 * 
 */
const News: React.FC<NewsCardProps> = ({ news }) => {
  const classes = useStyles();
  const divider = <span className={classes.divider}> </span>;
  const { t } = useTranslation();

  // used to cut off text if max length is reached
  const headlineMaxLength = 80;
  const summaryMaxLength = 80;

  return (
    <div className={classes.card}>
      <a href={news.url.toString()} className={classes.link}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" className={classes.pos}>
              {news.headline.length > headlineMaxLength
                ? `${t(news.headline.substring(0, headlineMaxLength))}...`
                : news.headline}
            </Typography>
            <Typography className={classes.pos}>
              {news.summary.length > summaryMaxLength
                ? `${t(news.summary.substring(0, summaryMaxLength))}...`
                : news.summary}
            </Typography>
            <div className={classes.footer}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {new Date(news.publishedAt).toISOString().split('T')[0]}
                {divider}
                {news.url.split('/')[2]}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </a>
    </div>
  );
};

export default News;

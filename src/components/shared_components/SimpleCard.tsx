import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from './images/ibm.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const data = {
    stocks: [
      {
        symbol: 'IBM',
        ISIN: "US4592001014",
        WKN: "851399",
        name: "International Business Machines Corporation",
        price: 20,
        marketCapitalization: "114263867392",
        analystTargetPrice: "137",
        div: "0.0508",
        currency: "USD",		
        country: "USA",		
        industry: "Information Technology Services",		
        picture: "images/ibm.jpg",
        date: "2021-03-23T18:25:43.511Z"
      }
    ]
}

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.stocks[0].symbol}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.stocks[0].name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

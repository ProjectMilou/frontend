import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KeyFiguresBar from './KeyFiguresBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    customSize: {
      maxWidth: 500,
    },
    root: {
        margin: '25px auto',
        minWidth: '50%',
        maxWidth: '1000px',
      },
  })
);

export type KeyFigure = {
  title: string;
  definition: string;
  // value?: number;
};


const KeyFigures: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.root}>
        <KeyFiguresBar/>
    </Card>
  );
};
export default KeyFigures;

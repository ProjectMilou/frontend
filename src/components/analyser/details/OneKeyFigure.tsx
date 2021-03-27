import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Checkbox, Toolbar, Typography, Tooltip } from '@material-ui/core';

export type KeyFigure = {
    title: string;
    definition: string;
    // value?: number;
};
  

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
      },
  })
);

export const OneKeyFigure: React.FC<KeyFigure> = (oneKeyFigureProp) => {
const classes = useStyles();
const [visible, setVisible] = React.useState<boolean>(true);

    const handleClick = () => {
        // TODO: change the chart
        setVisible(!visible);
        // console.log(visible)
    };
  
    return (
      <div>
        <Toolbar>
          <Checkbox color="primary" checked={visible} onChange={handleClick} />
          <Typography>{oneKeyFigureProp.title}</Typography>
          <Tooltip
            title={oneKeyFigureProp.definition}
            placement="top-start"
            classes={{ tooltip: classes.customSize }}
          >
            <InfoOutlined fontSize="small" />
          </Tooltip>
        </Toolbar>
      </div>
    );
  };
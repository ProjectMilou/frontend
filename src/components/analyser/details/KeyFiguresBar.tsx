import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Checkbox, Toolbar, Typography, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    customSize: {
      maxWidth: 500,
    },
  })
);

export type KeyFigure = {
  title: string;
  definition: string;
  // value?: number;
};

const KeyFigures: KeyFigure[] = [
  {
    title: 'Price to Earnings Ratio',
    definition:
      'The ratio for valuing a company that measures its current share price relative to its per-share earnings (EPS).',
  },
  {
    title: 'Price to Book Ratio',
    definition: 'definition of PBR',
  },
  {
    title: 'Price to Earnings Growth Ratio',
    definition: 'definition of PEGR',
  },
  {
    title: 'Earnings per Share',
    definition: 'definition of EPS',
  },
];

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

const KeyFiguresBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Toolbar>
        {KeyFigures.map((tmp) => (
          <OneKeyFigure title={tmp.title} definition={tmp.definition} />
        ))}
      </Toolbar>
    </div>
  );
};
export default KeyFiguresBar;

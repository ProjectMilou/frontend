import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import { Checkbox, Toolbar, Typography, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div>
      <Toolbar>
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PER.title')}
          definition={t('analyser.detail.keyfigure.PER.definition')}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PBR.title')}
          definition={t('analyser.detail.keyfigure.PBR.definition')}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.PEGR.title')}
          definition={t('analyser.detail.keyfigure.PEGR.definition')}
        />
        <OneKeyFigure
          title={t('analyser.detail.keyfigure.EPS.title')}
          definition={t('analyser.detail.keyfigure.EPS.definition')}
        />
      </Toolbar>
    </div>
  );
};
export default KeyFiguresBar;

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OneKeyFigure } from './OneKeyFigure';

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

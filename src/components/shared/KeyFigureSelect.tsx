import React from 'react';
import { Toolbar, FormControlLabel, Radio } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import InfoButton from './InfoButton';

/**
 * Allowed key figures.
 *
 * These localization keys must exist for each `keyFigure`:
 *
 * * `analyser.detail.keyfigure.${keyFigure}.title`
 * * `analyser.detail.keyfigure.${keyFigure}.definition`
 */
export type KeyFigure = 'PER' | 'PBR' | 'PEGR' | 'EPS';

export type KeyFigureSelectProps = {
  keyFigure: KeyFigure;
  selected: boolean;
  select: (keyFigure: KeyFigure) => void;
  textColor: string;
};

export const KeyFigureSelect: React.FC<KeyFigureSelectProps> = ({
  keyFigure,
  selected,
  select,
  textColor,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Toolbar>
        <FormControlLabel
          style={{
            color: textColor,
          }}
          control={
            <Radio
              style={{
                color: textColor,
              }}
              checked={selected}
              onChange={() => select(keyFigure)}
            />
          }
          label={t(`analyser.detail.keyfigure.${keyFigure}.title`)}
        />
        <InfoButton
          infotext={t(`analyser.detail.keyfigure.${keyFigure}.definition`)}
        />
      </Toolbar>
    </div>
  );
};

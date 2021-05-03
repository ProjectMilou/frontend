import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InfoButton from '../../shared/InfoButton';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    infoWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoBody: {
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      justifyContent: 'center',
      color: palette.primary.main,
      fontWeight: typography.fontWeightRegular,
      fontSize: '1.15rem',
    },
    infoTitle: {
      color: palette.primary.main,
      fontWeight: typography.fontWeightBold,
      fontSize: '1.25rem',
      margin: 0,
      whiteSpace: 'nowrap',
    },
    infoTitleP: {
      margin: '0.5rem 0.5rem',
      display: 'flex',
    },
  })
);

// InfoBlock props type declarations
type InfoBlockProps = {
  title: string;
  body: ReactElement;
  info: string;
};

// returns the details page header
/**
 * @param title - Title of the information block.
 * @param body - Specific information.
 * @param info - Information in the info button.
 * @return A information block which contains a title, a info button and body.
 */
const InfoBlock: React.FC<InfoBlockProps> = ({ title, body, info }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoTitle}>
        <p className={classes.infoTitleP}>
          {title}
          <>&nbsp;</>
          <InfoButton infotext={info} />
        </p>
      </div>
      <div className={classes.infoBody}>{body}</div>
    </div>
  );
};

export default InfoBlock;

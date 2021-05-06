import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  titleContainer: {
    display: 'flex',
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  titleWrapper: {
    marginRight: '1rem',
  },
  sectionTitle: {
    margin: 0,
    color: 'primary',
    fontSize: '2.25rem',
    fontWeight: 400,
    whiteSpace: 'nowrap',
  },
  lineWrapper: {
    display: 'flex',
    width: '100%',
    borderColor: 'grey',
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    paddingLeft: '2%',
  },
});

type SectionDividerProps = {
  section: string;
};

/**
 * Divider component used between other components (section)
 *
 * @param section Text to display in section divider
 */
const SectionDivider: React.FC<SectionDividerProps> = ({ section }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>{t(section)}</h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
    </>
  );
};

export default SectionDivider;

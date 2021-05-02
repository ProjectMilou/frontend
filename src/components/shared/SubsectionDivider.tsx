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
  sectionSubTitle: {
    margin: 0,
    color: 'primary',
    fontSize: '2rem',
    fontWeight: 400,
    whiteSpace: 'nowrap',
  },
});

type SubsectionDividerProps = {
  subsection: string;
};

/**
 * Divider component used between other components (subsection)
 *
 * @param subsection Text to display in subsection
 */
const SubsectionDivider: React.FC<SubsectionDividerProps> = ({
  subsection,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionSubTitle}>{t(subsection)}</h2>
        </div>
      </div>
    </>
  );
};

export default SubsectionDivider;
